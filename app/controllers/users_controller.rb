class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:profile, :edit, :update, :destroy]

  def profile
    authorize @user
  end

  def edit
    authorize @user
    render json: @user
  end

  def update
    authorize @user
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @user
    if @user.destroy
      # head :no_content
      flash[:alert] = "アカウントを削除しました。"
      redirect_to root_path
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:user_name, :email)
  end
end
