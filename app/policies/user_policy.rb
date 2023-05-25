class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.where(id: user.id)
    end
  end

  def profile?
    true
  end

  def edit?
    update?
  end

  def update?
    record == user
  end

  def destroy?
    record == user
  end
end
