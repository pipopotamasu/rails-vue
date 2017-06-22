Rails.application.routes.draw do
  resources :todos do
    collection do
      get 'grid_user'
    end
  end

  resources :grids do
    collection do
      get 'grid_user'
    end
  end
  root to: 'grids#index'
end
