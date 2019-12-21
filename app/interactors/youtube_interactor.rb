class YoutubeInteractor
  include ApplicationHelper

  def initialize(query = '', ids = [])
    @q = query
    @ids = ids
  end

  def fields
    'snippet, statistics'
  end

  def get_details
    _url = "#{BASE_URI}videos?part=#{fields}&key=#{KEY}&id=#{@ids.join(',')}"
    res = HTTParty.get(_url).body
    JSON.parse(res)
  end

  def search
    searchQuery = @q
    searchText = searchQuery.gsub(/ /, '%20')
    # we don't use page token unless we paginate
    pageTokenParam = false ? `&pageToken=` : '';
    _url = "#{BASE_URI}search?q=#{searchText}#{pageTokenParam}&type=video&part=id&key=#{KEY}"
    res = HTTParty.get(_url).body
    JSON.parse(res)
  end

end