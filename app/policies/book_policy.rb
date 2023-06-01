class BookPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.where(user: user)
    end
  end

  def index?
    true
  end

  def destroy?
    record.user == user
  end

  def failed?
    true
  end

  def new?
    create?
  end

  def create?
    true
  end
end
