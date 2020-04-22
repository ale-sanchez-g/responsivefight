str='
machine api.heroku.com
  login morsisdivine@gmail.com
  password TOKEN
'

echo "${str/'TOKEN'/$HEROKU_KEY}" > ~/.netrc