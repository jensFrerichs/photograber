class StartController < ApplicationController
  protect_from_forgery except: :get_new_pictures
  def index
    @test = 'test'
    @paths = Dir["#{Rails.root}/public/photos/*"]
    @urls = shorten_path(@paths)
  end
  def get_new_pictures
    @paths = Dir["#{Rails.root}/public/photos/*"]
    @urls = shorten_path(@paths)
    @old_paths = params[:data]
    @urls.reject! { |url| @old_paths.include?(url) }
    if @urls.size >= 1
      @urls.map! do |url|
        "<img src='#{url}'/>"
      end
    end
    render json: @urls
  end

  private

  def shorten_path(paths)
    prefix = "#{Rails.root}/public"
    @paths.map do |url|
      url.gsub(prefix, '')
    end
  end
end

