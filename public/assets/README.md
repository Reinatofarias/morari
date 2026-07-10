# Assets e Arquivos de Marca

Esta pasta serve para armazenar todas as imagens, fotos e logotipos que serão utilizados no site do Dr. Matheus Morari. 

Como esta pasta está dentro do diretório `public`, qualquer arquivo colocado aqui poderá ser acessado diretamente pelo site.

## Estrutura

- `/images`: Coloque aqui as fotos do Dr. Matheus (ex: fotos de perfil, fotos de consultório, fotos para os artigos).
- `/branding`: Coloque aqui os arquivos visuais da marca (ex: logotipo principal, ícones customizados, variações da logo).

## Como usar as imagens no código

Se você colocar uma foto chamada `foto-perfil.jpg` dentro da pasta `images`, você poderá chamá-la no código do Next.js assim:

```tsx
import Image from 'next/image';

// No seu componente:
<Image 
  src="/assets/images/foto-perfil.jpg" 
  alt="Foto do Dr. Matheus"
  width={500} 
  height={500} 
/>
```

**Dica de Performance:** Sempre prefira salvar as imagens no formato `.webp` ou `.jpg` comprimido. Evite imagens em formato `.png` muito grandes, a menos que precisem de fundo transparente (como a logo).
