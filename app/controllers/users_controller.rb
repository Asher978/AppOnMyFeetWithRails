class UsersController < ApiController
    before_action :require_login, except: [:create]
    
      def create
        user = User.create!(user_params)
        render json: { token: user.auth_token }
      end
    
      def profile
        user = User.find_by_auth_token!(request.headers[:token])
        user_runs = Run.where(user_id: user.id)
        user_profile = user.profile
        render json: { user: { username: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname, admin: user.admin },
        runs: user_runs,
        profile: user_profile,
      }
      end
    
      private
      def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :password, :admin)
      end
end
