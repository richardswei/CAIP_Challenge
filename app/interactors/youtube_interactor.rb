class YoutubeInteractor

  # in a real world scenario I'd probably put this in a ENV variable. Wouldn't want others to hijack our API Key
  KEY = "AIzaSyBAln3nc-CSnBuJuOK_l1su7gxgpIdX5xk" 
  BASE_URI = 'https://www.googleapis.com/youtube/v3/'.freeze

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
end
