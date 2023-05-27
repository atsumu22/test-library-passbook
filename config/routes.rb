Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "pages#home"
  resources :books
  resources :users, only: %i[edit update destroy]
  get '/profile', to: 'users#profile'
  get '/search', to: 'pages#search'
  get '/query', to: 'pages#query'
  get '/barcode', to: 'pages#barcode'
  get '/logsedit', to: 'pages#logsedit'
  get '/bookmarks', to: 'pages#bookmarks'
end
