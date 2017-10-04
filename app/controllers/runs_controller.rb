class RunsController < ApiController
    before_action :require_login, except: [:show]

    def index
      runs = current_user.runs.all
      render json: { runs: runs }
    end

    def show
        run = Run.find(params[:id])
        run_user = run.user
        render json: { run: run, username: run_user.username }
    end

    def create
        run = Run.new(run_params)
        run.user = current_user
    
        if run.save
          render json: {
            message: 'ok',
            run: run,
          }
        else
          render json: {message: 'Could not create run'}
        end
    end

    private
    def run_params
      params.require(:run).permit(:run_date, :miles, :starting_point, :starting_city, :ending_point, :ending_city)
    end

end
