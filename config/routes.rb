Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post   "/login"       => "sessions#create"
  delete "/logout"      => "sessions#destroy"
  get "/profile"        => "users#profile"
  resources :users
  resource :profile, only: [:show, :update]
  resources :runs
  resources :trackruns

  root to: "root#index"
  
end
