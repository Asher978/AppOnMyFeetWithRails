class Trackrun < ApplicationRecord
  belongs_to :user, optional: true
  serialize :rundata, JSON
  before_create do
    self.rundata ||= {}
  end
end
