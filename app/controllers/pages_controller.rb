class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def profile
  end

  def search
  end

  def barcode
  end

  def query
  end

  def logsedit
  end
end
