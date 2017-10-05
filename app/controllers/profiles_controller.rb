class ProfilesController < ApiController

    def show
        user = User.find_by_auth_token!(request.headers[:token])
        user_profile = user.profile
        render json: { profile: user_profile }
    end

    def update
        user = current_user
        user.profile.update!(update_params)
        render json: { profile: user.profile }
    end

    private
    def update_params
        params.require(:profile).permit(:half_marathons, :full_marathons, :picture)
    end
end
