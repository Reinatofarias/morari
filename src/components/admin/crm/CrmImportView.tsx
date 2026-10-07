'use client';

import React from 'react';
import Link from 'next/link';
import { Upload, FileSpreadsheet, Loader2, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import type { CrmStage } from '@/lib/crm/types';
import { ErrorState, Field, LoadingState, buttonGhost, buttonPrimary, crmFetch, inputClass } from './shared';

type TargetField =
  | ''
  | 'name'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'phone'
  | 'company'
  | 'job_title'
  | 'city'
  | 'source'
  | 'value'
  | 'tags'
  | 'notes';

const TARGETS: { value: TargetField; label: string; synonyms: string[] }[] = [
  { value: 'name', label: 'Nome completo', synonyms: ['nome', 'nome completo', 'name', 'full name', 'cliente', 'contato', 'lead', 'pessoa'] },
  { value: 'first_name', label: 'Primeiro nome', synonyms: ['primeiro nome', 'first name', 'nome proprio'] },
  { value: 'last_name', label: 'Sobrenome', synonyms: ['sobrenome', 'last name', 'ultimo nome'] },
  { value: 'phone', label: 'WhatsApp / Telefone', synonyms: ['whatsapp', 'telefone', 'celular', 'fone', 'phone', 'tel', 'contato telefone', 'numero', 'mobile', 'zap'] },
  { value: 'email', label: 'E-mail', synonyms: ['email', 'e-mail', 'mail', 'correio'] },
  { value: 'company', label: 'Empresa', synonyms: ['empresa', 'company', 'organizacao', 'organization', 'razao social', 'negocio'] },
  { value: 'job_title', label: 'Cargo', synonyms: ['cargo', 'funcao', 'job title', 'title', 'profissao', 'posicao'] },
  { value: 'city', label: 'Cidade', synonyms: ['cidade', 'city', 'municipio', 'localidade'] },
  { value: 'source', label: 'Origem', synonyms: ['origem', 'source', 'fonte', 'canal', 'campanha'] },
  { value: 'value', label: 'Valor (R$)', synonyms: ['valor', 'value', 'ticket', 'preco', 'faturamento estimado'] },
  { value: 'tags', label: 'Etiquetas', synonyms: ['tags', 'etiquetas', 'etiqueta', 'tag', 'segmento', 'categoria'] },
  { value: 'notes', label: 'Observações', synonyms: ['observacoes', 'observacao', 'obs', 'notas', 'nota', 'notes', 'comentarios', 'descricao'] },
];

type Cell = string | number | boolean | Date | null;

function normalizeHeader(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[_\-.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function guessTarget(header: string): TargetField {
  const normalized = normalizeHeader(header);
  if (!normalized) return '';
  for (const target of TARGETS) {
    if (target.synonyms.some((synonym) => normalizeHeader(synonym) === normalized)) return target.value;
  }
  for (const target of TARGETS) {
    if (target.synonyms.some((synonym) => normalized.includes(normalizeHeader(synonym)))) return target.value;
  }
  return '';
}

function parseCsv(text: string): string[][] {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? '';
  const delimiter = (firstLine.match(/;/g)?.length ?? 0) >= (firstLine.match(/,/g)?.length ?? 0) ? ';' : ',';
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === delimiter) {
      row.push(cell);
      cell = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

async function readFile(file: File): Promise<Cell[][]> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.csv') || name.endsWith('.txt')) {
    const buffer = await file.arrayBuffer();
    let text = new TextDecoder('utf-8').decode(buffer);
    // Excel no Windows costuma salvar CSV em Latin-1.
    if (text.includes('�')) text = new TextDecoder('windows-1252').decode(buffer);
    return parseCsv(text.replace(/^﻿/, ''));
  }
  if (name.endsWith('.xls')) {
    throw new Error('Arquivos .xls antigos não são suportados. No Excel, use "Salvar como" > Pasta de Trabalho do Excel (.xlsx) ou CSV.');
  }
  const { readSheet } = await import('read-excel-file/browser');
  return (await readSheet(file)) as Cell[][];
}

function cellText(value: Cell | undefined) {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'number' && Number.isInteger(value) && String(value).length >= 10) return String(value);
  return String(value).trim();
}

function buildRecord(row: Cell[], mapping: TargetField[]) {
  const record: Record<string, string> = {};
  const notes: string[] = [];
  let first = '';
  let last = '';
  mapping.forEach((target, index) => {
    const value = cellText(row[index]);
    if (!target || !value) return;
    if (target === 'first_name') first = value;
    else if (target === 'last_name') last = value;
    else if (target === 'notes') notes.push(value);
    else if (target === 'tags') record.tags = record.tags ? `${record.tags}, ${value}` : value;
    else if (!record[target]) record[target] = value;
  });
  if (!record.name && (first || last)) record.name = `${first} ${last}`.trim();
  if (notes.length) record.notes = notes.join('\n');
  return record;
}

export function CrmImportView() {
  const [stages, setStages] = React.useState<CrmStage[]>([]);
  const [loadingStages, setLoadingStages] = React.useState(true);
  const [stageError, setStageError] = React.useState('');

  const [fileName, setFileName] = React.useState('');
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<Cell[][]>([]);
  const [mapping, setMapping] = React.useState<TargetField[]>([]);
  const [parseError, setParseError] = React.useState('');
  const [parsing, setParsing] = React.useState(false);

  const [stageId, setStageId] = React.useState('');
  const [source, setSource] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [duplicates, setDuplicates] = React.useState<'skip' | 'update'>('skip');

  const [importing, setImporting] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [result, setResult] = React.useState<{ inserted: number; updated: number; skipped: number; invalid: number } | null>(null);
  const [importError, setImportError] = React.useState('');

  const loadStages = React.useCallback(async () => {
    try {
      const data = await crmFetch<{ stages: CrmStage[] }>('/api/admin/crm/stages');
      setStages(data.stages);
      setStageId((current) => current || data.stages[0]?.id || '');
      setStageError('');
    } catch (err) {
      setStageError(err instanceof Error ? err.message : 'Erro ao carregar etapas.');
    } finally {
      setLoadingStages(false);
    }
  }, []);

  React.useEffect(() => {
    // Adia a primeira carga para fora do corpo do efeito.
    const timer = window.setTimeout(() => void loadStages(), 0);
    return () => window.clearTimeout(timer);
  }, [loadStages]);

  const reset = () => {
    setFileName('');
    setHeaders([]);
    setRows([]);
    setMapping([]);
    setResult(null);
    setImportError('');
    setParseError('');
    setProgress(0);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    reset();
    setParsing(true);
    try {
      const data = (await readFile(file)).filter((row) => row.some((cell) => cellText(cell)));
      if (data.length < 2) throw new Error('A planilha precisa ter uma linha de cabeçalho e pelo menos um lead.');
      const headerRow = data[0].map((cell, index) => cellText(cell) || `Coluna ${index + 1}`);
      setHeaders(headerRow);
      setRows(data.slice(1));
      const guessed = headerRow.map(guessTarget);
      // Evita mapear duas colunas para o mesmo campo único automaticamente.
      const used = new Set<TargetField>();
      setMapping(
        guessed.map((target) => {
          if (!target || target === 'notes' || target === 'tags') return target;
          if (used.has(target)) return '';
          used.add(target);
          return target;
        })
      );
      setFileName(file.name);
      if (!source) setSource(`Planilha ${file.name.replace(/\.[^.]+$/, '')}`.slice(0, 120));
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'Não foi possível ler o arquivo.');
    } finally {
      setParsing(false);
    }
  };

  const records = React.useMemo(() => rows.map((row) => buildRecord(row, mapping)), [rows, mapping]);
  const hasIdentity = mapping.some((target) => ['name', 'first_name', 'email', 'phone'].includes(target));
  const usable = records.filter((record) => record.name || record.email || record.phone).length;

  const runImport = async () => {
    setImporting(true);
    setImportError('');
    setProgress(0);
    const totals = { inserted: 0, updated: 0, skipped: 0, invalid: 0 };
    try {
      const size = 1000;
      for (let start = 0; start < records.length; start += size) {
        const data = await crmFetch<typeof totals>('/api/admin/crm/import', {
          method: 'POST',
          body: JSON.stringify({ rows: records.slice(start, start + size), stage_id: stageId, source, tag, duplicates }),
        });
        totals.inserted += data.inserted;
        totals.updated += data.updated;
        totals.skipped += data.skipped;
        totals.invalid += data.invalid;
        setProgress(Math.min(records.length, start + size));
      }
      setResult(totals);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Erro na importação.');
      if (totals.inserted || totals.updated) setResult(totals);
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const csv = '﻿Nome;WhatsApp;E-mail;Empresa;Cargo;Cidade;Origem;Valor;Etiquetas;Observações\nJoão Silva;(69) 99999-0000;joao@empresa.com;Empresa X;Diretor;Porto Velho;Evento;1500;empresário, quente;Conheceu no workshop\n';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'modelo-importacao-leads.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loadingStages) return <LoadingState />;
  if (stageError) return <ErrorState message={stageError} onRetry={loadStages} />;

  if (result) {
    return (
      <div className="max-w-xl rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 space-y-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Importação concluída</h3>
        <ul className="text-sm text-slate-200 space-y-1">
          <li>{result.inserted} lead(s) novos adicionados ao funil</li>
          {result.updated > 0 && <li>{result.updated} lead(s) existentes atualizados</li>}
          {result.skipped > 0 && <li>{result.skipped} ignorados por já existirem (mesmo e-mail ou telefone)</li>}
          {result.invalid > 0 && <li>{result.invalid} linha(s) sem nome, e-mail ou telefone</li>}
        </ul>
        {importError && <p className="text-sm text-rose-300">Parou antes do fim: {importError}</p>}
        <div className="flex gap-2 pt-2">
          <Link href="/admin/crm" className={buttonPrimary}>
            Ver no funil
          </Link>
          <button onClick={reset} className={buttonGhost}>
            <RotateCcw className="w-4 h-4" />
            Importar outra lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {!fileName && (
        <div className="space-y-4">
          <label
            className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-12 text-center cursor-pointer hover:border-amber-500/60 transition-all"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              void onFile(event.dataTransfer.files[0]);
            }}
          >
            {parsing ? <Loader2 className="w-8 h-8 text-amber-400 animate-spin" /> : <Upload className="w-8 h-8 text-amber-400" />}
            <span className="text-base font-semibold text-white">Arraste sua planilha aqui ou clique para escolher</span>
            <span className="text-xs text-slate-400">Excel (.xlsx) ou CSV. A primeira linha deve ter os nomes das colunas.</span>
            <input
              type="file"
              accept=".xlsx,.csv,.txt,.xls"
              className="hidden"
              onChange={(event) => void onFile(event.target.files?.[0])}
            />
          </label>
          {parseError && <p className="text-sm text-rose-300">{parseError}</p>}
          <button onClick={downloadTemplate} className={buttonGhost}>
            <Download className="w-4 h-4" />
            Baixar planilha modelo
          </button>
        </div>
      )}

      {fileName && (
        <>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">{fileName}</p>
                <p className="text-xs text-slate-400">
                  {rows.length} linha(s) · {headers.length} coluna(s) · {usable} com dados de contato
                </p>
              </div>
            </div>
            <button onClick={reset} className={buttonGhost}>
              Trocar arquivo
            </button>
          </div>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">1. Ligue as colunas aos campos do CRM</h3>
              <p className="text-xs text-slate-400 mt-1">Já tentei adivinhar pelos nomes das colunas. Confira e ajuste se precisar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {headers.map((header, index) => (
                <div key={`${header}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <p className="text-xs font-semibold text-slate-200 truncate">{header}</p>
                  <p className="text-[11px] text-slate-500 truncate mb-2">Ex.: {cellText(rows[0]?.[index]) || '—'}</p>
                  <select
                    className={`${inputClass} py-1.5 text-xs`}
                    value={mapping[index] ?? ''}
                    onChange={(event) =>
                      setMapping((current) => current.map((value, i) => (i === index ? (event.target.value as TargetField) : value)))
                    }
                  >
                    <option value="">Ignorar esta coluna</option>
                    {TARGETS.map((target) => (
                      <option key={target.value} value={target.value}>
                        {target.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {!hasIdentity && (
              <p className="text-sm text-amber-300">Ligue pelo menos uma coluna a Nome, E-mail ou Telefone.</p>
            )}
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Onde esses leads entram</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Field label="Etapa inicial">
                <select className={inputClass} value={stageId} onChange={(event) => setStageId(event.target.value)}>
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Origem (quando a planilha não tiver)">
                <input className={inputClass} value={source} onChange={(event) => setSource(event.target.value)} />
              </Field>
              <Field label="Etiqueta para esta lista">
                <input className={inputClass} value={tag} onChange={(event) => setTag(event.target.value)} placeholder="lista-outubro" />
              </Field>
              <Field label="Se o lead já existir">
                <select className={inputClass} value={duplicates} onChange={(event) => setDuplicates(event.target.value as 'skip' | 'update')}>
                  <option value="skip">Ignorar (não duplicar)</option>
                  <option value="update">Atualizar com os dados da planilha</option>
                </select>
              </Field>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">3. Prévia</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-slate-400">
                  <tr>
                    {['Nome', 'Telefone', 'E-mail', 'Empresa', 'Cargo', 'Cidade', 'Origem', 'Etiquetas'].map((label) => (
                      <th key={label} className="p-2 text-left font-semibold">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {records.slice(0, 5).map((record, index) => (
                    <tr key={index}>
                      <td className="p-2">{record.name}</td>
                      <td className="p-2">{record.phone}</td>
                      <td className="p-2">{record.email}</td>
                      <td className="p-2">{record.company}</td>
                      <td className="p-2">{record.job_title}</td>
                      <td className="p-2">{record.city}</td>
                      <td className="p-2">{record.source || source}</td>
                      <td className="p-2">{[record.tags, tag].filter(Boolean).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {importError && <p className="text-sm text-rose-300">{importError}</p>}
            <div className="flex items-center justify-end gap-3">
              {importing && (
                <span className="text-xs text-slate-400">
                  Importando {progress} de {records.length}...
                </span>
              )}
              <button onClick={runImport} disabled={!hasIdentity || importing || usable === 0} className={buttonPrimary}>
                {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Importar {usable} lead(s)
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
