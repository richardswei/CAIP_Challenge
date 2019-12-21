class PagesController < ApplicationController
  include ApplicationHelper

  def show
    query = params[:query] || 'Ruby On Rails'
    _ids = get_search_results(query)
    @videos = get_full_details(_ids)

    # I'm able to retrieve the data based on the content of @videos
    # and it seems fairly close to being able to be re-rendered upon search
    # but my API quota has exceeded so it's pretty hard to continue trying

    # respond_to do |format|
    #   format.json { render json: @videos }
    #   format.html
    # end
  end

  def get_full_details(ids)
    yt = YoutubeInteractor.new('', ids)
    yt.get_details
  end

  def get_search_results(query) 
    yt = YoutubeInteractor.new(query)
    yt.search["items"].collect{ |i| i["id"]["videoId"] }
  end


end
