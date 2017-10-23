class TrackrunsController < ApiController
  before_action :require_login, except: [:index]

  def index
    trackruns = current_user.trackruns.all
    render json: {trackruns: trackruns}
  end

  def create
    trackrun = Trackrun.new
    trackrun.rundata = trackruns_params
    trackrun.user = current_user
    
    if trackrun.save
      render json: {
        message: 'ok',
        trackrun: trackrun,
      }
    else
      render json: {message: 'Could not create run'}
    end
  end

  def show
    
  end


  private
    def trackruns_params
      a = params.require(:trackrun).permit!
      a
    end


end
