Rails.application.routes.draw do
  resources :todos do
    collection do
      get 'all'
    end
  end

  resources :grids do
    collection do
      get 'grid_user'
    end
  end

  resources :vuexes

  get '/home', to: 'home#index'
  root to: 'home#index'
end
