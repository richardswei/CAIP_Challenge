Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#home'

  resource :page do
    member do
      get 'get_search_results'
    end
  end

end
