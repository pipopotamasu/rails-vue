class ListsController < ApplicationController
  def create
    List.bulk_create(lists_params)
    render json: :created
  end

  def all
    lists = []
    List.all.each do |list|
      lists.push({ id: list.id,
                   order: list.order,
                   title: list.title,
                   cards: Card.where(list_id: list.id) })
    end
    render json: lists
  end

  private

  def lists_params
    params.require(:lists).map do |list|
      list.permit(:title, :order, cards_attributes: [:name, :order, :list_id])
    end
  end
end
