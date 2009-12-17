# Serve example from a webserver
# Useful for testing the cookie functionality
require 'sinatra'
root = Sinatra::Application.root
set :public, root
get('/') { File.read(root+'/example.html') }
run Sinatra::Application