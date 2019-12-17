class YoutubeInteractor

  KEY = 'AIzaSyASH2bwgKRWrp-5MhMZtPF5pwqhdg_7ll4'.freeze
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
    puts JSON.parse(res)
    JSON.parse(res)
  end
end
