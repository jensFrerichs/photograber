class StartController < ApplicationController
  protect_from_forgery except: :get_new_pictures
  before_action :set_paths_urls

  def index
    @slideshow = true unless params[:grid]
    @test = 'test'
  end

  def get_new_pictures
    @old_paths = params[:data]
    @urls.reject! { |url| @old_paths.include?(url) }
    render json: @urls
  end

  private

  def set_paths_urls
    @paths = Dir["#{Rails.root}/public/photos/*.JPG"]
    @urls = shorten_path(@paths)
  end

  def shorten_path(paths)
    prefix = "#{Rails.root}/public"
    paths.map do |url|
      url.gsub(prefix, '')
    end
  end
end

