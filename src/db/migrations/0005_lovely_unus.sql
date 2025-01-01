CREATE or replace function bulk_delete_users(ids uuid[])
	returns json
LANGUAGE plpgsql SECURITY DEFINER
AS $$
begin
	delete from auth.users where id in (select unnest(ids));

	return '{"data":true}';
end;
$$;