class Run < ApplicationRecord
    belongs_to :user
    geocoded_by :first_intersection
    after_validation :geocode

    def first_intersection
        [starting_street1, staring_city].compact.join(', ')
    end
end
