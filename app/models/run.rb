class Run < ApplicationRecord
    belongs_to :user
    geocoded_by :full_address
    after_validation :geocode

    def full_address
        [starting_point, starting_city].compact.join(',')
        # ending = [ending_street1, ending_street2, ending_city].compact.join(',')
    end
end
