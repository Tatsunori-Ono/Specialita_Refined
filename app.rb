require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?

require './models'

# JSON
require 'json'

enable :sessions

before do
    # unless the user is logged in, /home is not accessible from url
    #mistakes
        # if !User && request.path_info != "/" && request.path_info != "/signin" && request.path_info != "/signup"
        # if !User && request.path_info == ["/", "/signin", "/signup"]
        # if !User && request.path_info != ["/", "/signin", "/signup"]
        # if !User && !["/", "/signin", "/signup"].include?(request.path_info)
        # if !User && request.path_info == "/home"
    #below works as well!
         #if !current_user && request.path_info != "/" && request.path_info != "/signin" && request.path_info != "/signup"
    if !current_user && !["/", "/signin", "/signup"].include?(request.path_info)  
        # Using Sinatra Flash to show pop-up message for Users
        flash[:notice] = "Please sign up or sign in before accessing!"
        redirect '/'
    end
end

#current_userは上のbefore do unlessを可能にするために必要
# ログイン中のユーザの情報を取得するためのhelperを定義します。
helpers do
    def current_user
        User.find_by(id: session[:user])
    end
end

get '/' do
    erb :sp_home
end

get '/signin' do
    erb :sign_in
end

get '/signup' do
    erb :sign_up
end

get '/home' do
    if current_user.nil?
        @records = Record.none
    else
        @records = current_user.records
    end
    erb :home
end

post '/home' do
    # puts params[:total_time]
    if current_user.nil?
        @total_time = Record.none
        @subject = Record.none
    else
        @total_time = Record.find_by(subject: params[:subject])
        
        @total_time.total_time = params[:total_time]
        @total_time.save
    end
end

post '/total_time' do
    @total_time = Record.find_by(subject: params[:subject])
    # instance variable (Hashデータ型)をJSONの形式で返す
    return @total_time.to_json
end

post '/signin' do
    user = User.find_by(mail: params[:mail])
    if user && user.authenticate(params[:password])
        session[:user] = user.id
    end
    redirect '/home'
end

post '/signup' do
    @user = User.create(username_first: params[:username_first], username_middle: params[:username_middle], username_last: params[:username_last], mail: params[:mail], password: params[:password], password_confirmation: params[:password_confirmation])
    if @user.persisted?
        session[:user] = @user.id
    end
    redirect '/home'
end

get '/signout' do
    session[:user] = nil
    redirect '/'
end

get '/subject/new' do
   erb :subject
end

post '/subject_add' do
    current_user.records.create(subject: params[:subject])
    redirect '/home'
end

get '/add_specialita' do
    erb :add_specialita
end

get '/overall_records' do
    @records = Record.all
    erb :overall_records
end

get '/setting' do
    erb :setting
end