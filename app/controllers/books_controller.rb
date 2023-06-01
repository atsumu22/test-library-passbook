class BooksController < ApplicationController
  before_action :set_book, only: [:destroy]

  def index
    @books = policy_scope(Book).where(user: current_user, status: 0).order(:updated_at)
    @books_for_first_page = @books.map.with_index {|book, i| book if i <=7 }.compact
    @books_after_second_page = @books - @books_for_first_page
    @second_books = optimize_books_after_second_page(@books_after_second_page)
    # render json: @books
  end

  def new
    @book = Book.new
    authorize @book
  end

  def failed
    @book = Book.new(book_params)
    @book.user = current_user
    authorize @book
  end

  def create
    @book = Book.new(book_params)
    @book.user = current_user
    @duplicate_book = Book.where(title: @book.title, author: @book.author, user: current_user).first
    authorize @book
    if @duplicate_book.nil?
      @book.save
      if @book.save
      # render json: @book, status: :created
        redirect_to books_path
      else
        render :new, status: :unprocessable_entity
      end
    elsif @duplicate_book && @duplicate_book.status == @book.status
      render :failed, status: :unprocessable_entity
    elsif @duplicate_book && @duplicate_book.status != @book.status
      @duplicate_book.bookmark? ?  @duplicate_book.log! : @duplicate_book.bookmark!
      render json: @book, status: 202
    end
  end


  def destroy
    authorize @book
    @book.destroy
    redirect_to root_path, status: :see_other
    # head :no_content
  end

  private

  def optimize_books_after_second_page(books_array)
    devided_books = books_array.each_slice(8).to_a
    optimized_devided_books = devided_books.each_slice(2).to_a
    return optimized_devided_books
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author, :publisher, :image_url, :price, :status)
  end
end
