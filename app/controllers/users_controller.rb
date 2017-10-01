class UsersController < ApiController
    before_action :require_login, except: [:create]
    
      def create
        user = User.create!(user_params)
        render json: { token: user.auth_token }
      end
    
      def profile
        user = User.find_by_auth_token!(request.headers[:token])
        user_runs = Run.where(user_id: user.id)
        render json: { user: { username: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname, half_marathons: user.half_marathons,
        full_marathons: user.full_marathons, total_miles: user.total_miles, picture: user.picture, admin: user.admin },
        runs: user_runs,
      }
      end
    
      private
      def user_params
        params.require(:user).permit(:username, :firstname, :lastname, :email, :password, :half_marathons, :full_marathons, :total_miles, :picture, :admin)
      end
end
