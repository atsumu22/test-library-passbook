class BooksController < ApplicationController
  before_action :set_book, only: [:destroy]

  def index
    @books = policy_scope(Book)
    # render json: @books
  end

  def create
    @book = Book.new(book_params)
    @book.user = current_user
    @duplicate_book = Book.where(title: @book.title, author: @book.author, user: current_user).first
    authorize @book
    if @duplicate_book.nil?
      @book.save
      render json: @book, status: :created
    elsif @duplicate_book && @duplicate_book.status == @book.status
      render json: @book.errors, status: :unprocessable_entity
    elsif @duplicate_book && @duplicate_book.status != @book.status
      @duplicate_book.bookmark? ?  @duplicate_book.log! : @duplicate_book.bookmark!
    end
  end

  def destroy
    authorize @book
    @book.destroy
    head :no_content
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author, :publisher, :image_url, :price, :status)
  end
end
