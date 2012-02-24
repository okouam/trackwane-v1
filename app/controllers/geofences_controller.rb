class GeofencesController < ApplicationController
  before_filter :require_user

  def index
    @geofences = Account.find(session[:account_id]).geofences
    respond_to do |format|
      format.json {render json: {success: true, results: @geofences}}
    end
  end

  def create
    geofence = Geofence.new(params.slice(*Geofence.column_names))
    Rails.logger.info(session)
    geofence.account = Account.find(session[:account_id])
    if geofence.save
       render json: {success: true, results: [geofence.as_json]}
    else
      render json: {success: false}
    end
  end

  def destroy
    Geofence.find(params[:id]).destroy
    render json: {success: true}
  end

end
