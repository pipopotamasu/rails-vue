class List < ApplicationRecord
  has_many :cards, dependent: :destroy
  accepts_nested_attributes_for :cards

  def self.bulk_create(lists)
    destroy_all
    lists.each do |list|
      List.new(list).save!
    end
  end
end
