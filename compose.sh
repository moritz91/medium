#!/bin/bash


removeDirectories() {

  findDirectories() {
    find $1 -type d -name $2 -prune -maxdepth ${3:-2} -print
  }

  if [[ -n $(findDirectories $1 $2 $3) ]]; then
    echo "Found $2 folder/s: "$(findDirectories $1 $2 $3);
    read -r -p "Do you really want to delete it? [y/n] " input; 

    if [[ ! $input != "y" ]] && [[ -n $(findDirectories $1 $2 $3) ]]; then
      find $1 -type d -name $2 -prune -maxdepth ${3:-2} -exec rm -rf {} \;
    fi
  
  else
    echo "$1/$2 does not exist."
  fi
}

initializeDirectoryRemoval() {
  declare -A directories

  directories[common]="dist"
  directories[web]=".next"

  if [[ $1 == "server" ]]; then
    directories[server]="dist"
  fi

  # delete dist folders in packages/{common,server,web} respectively
  for dir in "${!directories[@]}"; do
    removeDirectories "./packages/$dir" ${directories[$dir]}
  done;
}

PS3="Operation: "

options=("rebuild frontend" "rebuild backend" "docker-compose up" "re-install dependencies" "quit")

select opt in "${options[@]}"; do

  case $opt in
    "rebuild frontend")
      initializeDirectoryRemoval
      yarn build:web
      break
      ;;
    "rebuild backend")
      initializeDirectoryRemoval server
      yarn build:web
      yarn build:server
      break
      ;;
    "docker-compose up")
      docker-compose up
      ;;
    "re-install dependencies")
      removeDirectories . "node_modules" 3
      yarn install
      break
      ;;
    "quit")
      break
      ;;
    *) 
      echo "Invalid option $REPLY"
      ;;
  esac
done