class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def search
  end

  def barcode
  end

  def query
  end

  def logsedit
  end

  def bookmarks
    @books = Book.where(user: current_user, status: 1)
  end
end
