require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?

require './models'

# JSON
require 'json'

# Image Uploading
require 'securerandom'

enable :sessions

before do
    # unless the user is logged in, /home is not accessible from url
    if !current_user && !["/", "/signin", "/signup", "/credit", "/guide"].include?(request.path_info)  
        # Using Sinatra Flash to show pop-up message for Users
        flash[:notice] = "Please sign up or sign in before accessing!　サインアップ、またはサインインをしてください！"
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
    # 選ばれてるSP画像を中間テーブルに
    @sp_image_row = current_user.records.find_by(subject: params[:subject])
    current_user.user_sp_images.create(user: current_user, record: @sp_image_row)
    
    # Total_timeの送信
    @total_time = current_user.records.find_by(subject: params[:subject])
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
    file = params[:sp_image]
    ext_name = File.extname(file[:filename])
    if [".jpeg", ".jpg", ".png"].include?(ext_name.downcase)
        file_name = SecureRandom.uuid+ext_name
        path_to_save_to_db = "images/user_images/#{file_name}"
        save_path = "./public/images/user_images/#{file_name}"
        File.open(save_path, 'wb') do |f|
            f.write(file[:tempfile].read)
        end
        # subjectとimage_pathを１行に保存
        current_user.records.create(subject: params[:subject], image: path_to_save_to_db)
    else
        500
    end
    
    redirect '/home'
end

get '/add_specialita' do
    erb :add_specialita
end

get '/overall_records' do
    @records = current_user.records.all
    erb :overall_records
end

get '/credit' do
    erb :credit
end

get '/atlier' do
    erb :atlier
end

get '/setting' do
    if current_user.nil?
        @backgrounds = Background.none
    else
        @backgrounds = current_user.backgrounds
    end
    erb :setting
end

post '/background' do
    @background = Background.find_by(bg_name: params[:bg_name])
    return @background.to_json
end

post '/save_bg' do
    @background_row = current_user.backgrounds.find_by(bg_name: params[:bg_name])
    current_user.user_bg_images.create(user: current_user, background: @background_row)
    flash[:notice] = "Background Saved!"
end

get '/add_bg' do
    erb :add_bg
end

post '/add_bg' do
    file = params[:bg_image]
    ext_name = File.extname(file[:filename])
    if [".jpeg", ".jpg", ".png"].include?(ext_name.downcase)
        file_name = SecureRandom.uuid+ext_name
        path_to_save_to_db = "images/user_images/#{file_name}"
        save_path = "./public/images/user_images/#{file_name}"
        File.open(save_path, 'wb') do |f|
            f.write(file[:tempfile].read)
        end
        current_user.backgrounds.create(bg_name: params[:bg_name], bg_image: path_to_save_to_db)
    else
        500
    end
    
    redirect '/setting'
end

get '/characters' do
    if current_user.nil?
        @records = Record.none
    else
        @records = current_user.records
    end
    erb :characters
end

get '/guide' do
    erb :guide
end