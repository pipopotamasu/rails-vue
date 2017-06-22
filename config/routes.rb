Rails.application.routes.draw do
  resources :grids do
    collection do
      get 'grid_user'
    end
  end
  root to: 'grids#index'
end
