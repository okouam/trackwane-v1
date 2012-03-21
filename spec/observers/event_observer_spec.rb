require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe EventObserver do

  it "checks for speed warnings" do
    pending
  end

  it "checks for geofence warnings" do
    pending
  end

  describe "when finding the closest road" do

    context "and there is a road within 10m" do
       it "find the correct address" do
        event = Factory.build(:event, longitude: -4.06395, latitude: 5.34676)
        observer = EventObserver.instance
        observer.before_save(event)
        event.address.should == "Rue P152"
      end
    end

    context "and there is no road within 10m" do
      it "sets the address to nothing" do
        pending
      end
    end

  end

  describe "when calculing the distance covered since the last event" do

    context "and there was no previous event" do
      it "sets the distance covered to 0" do
        pending
      end
    end

    context "and there was a previous event" do
      it "finds the distance covered since the last event" do
        device = Factory(:device)
        Factory(:event, :device => device, :longitude => 0, :latitude => 0)
        device.reload
        event = Factory.build(:event, :longitude => 0.005, :latitude => 0.000, :device => device)
        observer = EventObserver.instance
        observer.before_save(event)
        event.distance_delta.should == 556.5974539663679
      end
    end

  end

  describe "when the event occurs next to a place" do

    before(:all) do
      @account = Factory(:account, name: "0-One")
      @device = Factory(:device, account: @account)
    end

    context "and the place is within 20m" do
      it "assigns the event to the place" do
        place = Factory(:place, account: @account, longitude: -4.06390, latitude: 5.34670, :category => "Pubs")
        event = Factory.build(:event, device: @device, longitude: -4.06393, latitude: 5.34676)
        observer = EventObserver.instance
        observer.before_save(event)
        event.place.should == place
      end
    end

    context "and the place is not within 20m" do
      it "does not assign the event to the place" do
        Factory(:place, account: @account, longitude: -4.06390, latitude: 5.34670, :category => "Pubs")
        event = Factory.build(:event, device: @device, longitude: 0.06393, latitude: 0.34676)
        observer = EventObserver.instance
        observer.before_save(event)
        event.place.should be_nil
      end
    end

  end

end