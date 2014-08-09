class PublicController < ApplicationController
  def index
  end

  def landing

    render 'landing', layout: 'landing'
  end
end
