class GridsController < ApplicationController
  def index
  end

  def grid_user
    render json: Grid.all
  end
end
