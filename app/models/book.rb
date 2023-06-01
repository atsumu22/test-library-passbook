class Book < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  # validates :author, presence: true
  # validates :publisher, presence: true
  # validates :user_id, uniqueness: true
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  enum :status, { log: 0, bookmark: 1 }

  def bookmark?
    status == "bookmark"
  end

  def log!
    update(status: "log")
  end

  def bookmark!
    update(status: "bookmark")
  end
end
