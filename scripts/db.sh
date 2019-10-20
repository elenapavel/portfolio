DB_PATH="/apps/ryota.ro/db.sqlite"

ask() {
	while true; do
    read -p "$@" answer
    case $answer in
      [Yy]*) break;; # just let it flow
      [Nn]*) exit;;
	        *) echo "Press y or n";;
    esac
	done
}

pull_db_from_server() {
	scp root@199.247.17.83:"$DB_PATH" .
}

push_db_to_server() {
	ask "Overwrite db.sqlite on ryota.ro? "
	scp db.sqlite root@199.247.17.83:"$DB_PATH"
}


case $1 in
	pull) pull_db_from_server;;
	push) push_db_to_server;;
esac