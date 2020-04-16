import React from  'react';
import Info from './components/info';
import Weather from './components/weather';
import Form from './components/form';

const API_KEY = "cca8c0b4d7a808d43441f6c9ff06987e";

class App extends React.Component {

    state = {
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined
      
    }

    gettingWeather = async (e) => {
       e.preventDefault();
       const city = e.target.elements.city.value;

       if(city) {
        const api_url = await 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();

       const sunset = data.sys.sunset;
       const date = new Date();
       date.setTime(sunset);
       const sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          sunset: sunset_date,
          error: undefined
       });
      }  else {
          this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunset: undefined,
          error: "Enter a city"
        });
      }
    }

  render() {
    return (
      <div className="wrapper">
       <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 info">
              <Info />
            </div>
          <div className="col-sm-7 form">
          <Form weatherMethod={this.gettingWeather} />
            <Weather 
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunset={this.state.sunset}
              error={this.state.error}
            />
         </div>
        </div>
      </div>
     </div> 
    </div>
    );
  }
}

export default App;