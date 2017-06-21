Rails.application.routes.draw do
  get 'grids/index'

  root to: 'home#index'
end
