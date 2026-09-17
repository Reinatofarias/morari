REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.reschedule_appointment(uuid, date, time) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.book_appointment(date, time, text, text, text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.booked_times(date) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.reschedule_appointment(uuid, date, time) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.book_appointment(date, time, text, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.booked_times(date) TO anon, authenticated, service_role;
