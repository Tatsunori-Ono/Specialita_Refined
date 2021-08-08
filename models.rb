# ActiveRecord::Base.establish_connection

class User < ActiveRecord::Base
  has_secure_password
  validates :mail,
    presence: true,
    format: {with:/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i},
    uniqueness: true
  validates :password,
    presence: true,
    length: {in: 5..20}
    # on: :create
  has_many :records
  has_many :missions
  has_many :backgrounds
  has_many :user_bg_images
  has_many :user_sp_images
end

class Record < ActiveRecord::Base
  belongs_to :user
end

class Mission < ActiveRecord::Base
  belongs_to :user
end

class Background < ActiveRecord::Base
  belongs_to :user
  has_many :user_bg_images
end

class UserBgImage < ActiveRecord::Base
  belongs_to :user
  belongs_to :background
end

class UserSpImage < ActiveRecord::Base
  belongs_to :user
  belongs_to :record
end