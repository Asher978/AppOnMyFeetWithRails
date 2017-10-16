class User < ApplicationRecord
    validates_uniqueness_of :username
    has_secure_password
    has_secure_token :auth_token
    has_many :runs
    has_one :profile
    has_many :trackruns
    after_create :build_profile
    accepts_nested_attributes_for :profile
  
    def invalidate_token
      self.update_columns(auth_token: nil)
    end
  
    def self.validate_login(username, password)
      user = find_by(username: username)
      if user && user.authenticate(password)
        user
      end
    end

    def build_profile
      Profile.create(user: self)
    end

end
