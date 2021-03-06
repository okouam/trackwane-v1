class SpeedAlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json  do
        @alarms = current_account.speed_alarms
        render json: @alarms
      end
    end
  end

  def show
    render :json => SpeedAlarm.find(params[:id])
  end

  def create
  	changes = params.slice(*SpeedAlarm.column_names)
		alarm = SpeedAlarm.new(changes)
    alarm.account = current_account
    if alarm.save
      render json: alarm.as_json
    else
      render json: alarm.errors, status: 400
    end
  end

  def destroy
    SpeedAlarm.find(params[:id]).destroy
    render json: {success: true}
  end

end