Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  get '/', to: 'start#index'
  post '/fetch', to: 'start#get_new_pictures'
end
