import React, { useContext, useEffect, useState } from "react";
import CustomersContext from "../Customers/CustomersContext";
import ReportsContext from "./ReportsContext";
import axios from "axios";

const ReportsState = (props) => {
  const { customers } = useContext(CustomersContext);
  const [propertiesFromDB, setPropertiesFromDB] = useState([]);
  const [inventoriesFromDB, setInventoriesFromDB] = useState([]);
  const [postsFromDB, setPostsFromDB] = useState([]);

  const getPercentage = (quantity, comparisonQuantity) => {
    if (comparisonQuantity == 0) {
      return 0;
    } else if (Number.isNaN(quantity / comparisonQuantity)) {
      return 0;
    } else {
      return displayPercent(quantity / comparisonQuantity);
    }
  };

  const displayPercent = (percent) => {
    if (percent === null || percent === undefined) {
      return 0;
    } else {
      return (percent * 100).toPrecision(2) - 100;
    }
  };

  const fetchProperties = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/properties`)
      .then((res) => {
        setPropertiesFromDB(res.data);
      })
      .catch((error) => {});
  };

  const fetchInventories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/inventories`)
      .then((res) => {
        setInventoriesFromDB(res.data);
      })
      .catch((error) => {});
  };

  const fetchPosts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/posts`)
      .then((res) => {
        setPostsFromDB(res.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchProperties();
    fetchInventories();
    fetchPosts();
  }, []);

  const getPropertyWithLargestArea = () => {
    return propertiesFromDB.sort((a, b) => b.totalSurface - a.totalSurface)[0];
  };

  const getPropertyWithLessArea = () => {
    return propertiesFromDB.sort((a, b) => a.totalSurface - b.totalSurface)[0];
  };

  const getCustomerWithMoreProperties = () => {
    return customers.sort(
      (a, b) =>
        b.ownerProperties.length +
        b.tenantProperties.length -
        (a.ownerProperties.length + a.tenantProperties.length)
    )[0];
  };

  const getCustomersWithoutProperties = () => {
    let customersWithoutProperties = [];

    customers.forEach((customer) => {
      return customer.ownerProperties.length +
        customer.tenantProperties.length ===
        0
        ? customersWithoutProperties.push(customer)
        : null;
    });
    return customersWithoutProperties;
  };

  const getAvailablePropertiesForRent = () => {
    let availablePropertiesForRentQuantity = 0;
    propertiesFromDB.forEach((property) => {
      return property.isForRent == false
        ? availablePropertiesForRentQuantity++
        : null;
    });
    return availablePropertiesForRentQuantity;
  };

  const getAvailablePropertiesForSale = () => {
    let availablePropertiesForSaleQuantity = 0;
    propertiesFromDB.forEach((property) => {
      return property.isForSale == false
        ? availablePropertiesForSaleQuantity++
        : null;
    });
    return availablePropertiesForSaleQuantity;
  };

  const getRentedProperties = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;

    propertiesFromDB.forEach((property) => {
      if (property.rentDate != null) {
        property.rentDate = new Date(property.rentDate);
        property.rentDate.setHours(0, 0, 0, 0);
        if (property.rentDate.getTime() == today.getTime()) {
          todayQuantity++;
        } else if (property.rentDate > lastWeek) {
          lastWeekQuantity++;
        } else if (property.rentDate > lastMonth) {
          lastMonthQuantity++;
        } else if (property.rentDate > lastYear) {
          lastYearQuantity++;
        }
      }
    });
    let rentedPropertiesComparison = getRentedPropertiesComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      rentedPropertiesComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      rentedPropertiesComparison.twoWeekAgoQuantity
    );

    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      rentedPropertiesComparison.twoMonthsAgoQuantity
    );

    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      rentedPropertiesComparison.twoYearsAgoQuantity
    );

    let rentedProperties = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return rentedProperties;
  };

  const getSoldProperties = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;

    propertiesFromDB.forEach((property) => {
      if (property.saleDate != null) {
        property.saleDate = new Date(property.saleDate);
        property.saleDate.setHours(0, 0, 0, 0);
        if (property.saleDate.getTime() == today.getTime()) {
          todayQuantity++;
        } else if (property.saleDate > lastWeek) {
          lastWeekQuantity++;
        } else if (property.saleDate > lastMonth) {
          lastMonthQuantity++;
        } else if (property.saleDate > lastYear) {
          lastYearQuantity++;
        }
      }
    });
    let soldPropertiesComparison = getSoldPropertiesComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      soldPropertiesComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      soldPropertiesComparison.twoWeekAgoQuantity
    );
    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      soldPropertiesComparison.twoMonthsAgoQuantity
    );

    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      soldPropertiesComparison.twoYearsAgoQuantity
    );

    let soldProperties = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return soldProperties;
  };

  const getSoldPropertiesComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    propertiesFromDB.forEach((property) => {
      if (property.saleDate != null) {
        property.saleDate = new Date(property.saleDate);
        property.saleDate.setHours(0, 0, 0, 0);
        if (property.saleDate.getTime() == yesterday.getTime()) {
          yesterdayQuantity++;
        } else if (property.saleDate > twoWeekAgo) {
          twoWeekAgoQuantity++;
        } else if (property.saleDate > twoMonthsAgo) {
          twoMonthsAgoQuantity++;
        } else if (property.saleDate > twoYearsAgo) {
          twoYearsAgoQuantity++;
        }
      }
    });
    let soldPropertiesComparison = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return soldPropertiesComparison;
  };

  const getRentedPropertiesComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    propertiesFromDB.forEach((property) => {
      if (property.rentDate != null) {
        property.rentDate = new Date(property.rentDate);
        property.rentDate.setHours(0, 0, 0, 0);
        if (property.rentDate.getTime() == yesterday.getTime()) {
          yesterdayQuantity++;
        } else if (property.rentDate > twoWeekAgo) {
          twoWeekAgoQuantity++;
        } else if (property.rentDate > twoMonthsAgo) {
          twoMonthsAgoQuantity++;
        } else if (property.rentDate > twoYearsAgo) {
          twoYearsAgoQuantity++;
        }
      }
    });
    let rentedProperties = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return rentedProperties;
  };

  const getInventories = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;

    inventoriesFromDB.forEach((inventory) => {
      if (inventory.createdAt != null) {
        inventory.createdAt = new Date(inventory.createdAt);
        inventory.createdAt.setHours(0, 0, 0, 0);
        if (inventory.createdAt.getTime() == today.getTime()) {
          todayQuantity++;
        } else if (inventory.createdAt > lastWeek) {
          lastWeekQuantity++;
        } else if (inventory.createdAt > lastMonth) {
          lastMonthQuantity++;
        } else if (inventory.createdAt > lastYear) {
          lastYearQuantity++;
        }
      }
    });
    let inventoriesComparison = getInventoriesComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      inventoriesComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      inventoriesComparison.twoWeekAgoQuantity
    );

    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      inventoriesComparison.twoMonthsAgoQuantity
    );
    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      inventoriesComparison.twoYearsAgoQuantity
    );

    let inventories = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return inventories;
  };

  const getInventoriesComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    inventoriesFromDB.forEach((inventory) => {
      if (inventory.createdAt != null) {
        inventory.createdAt = new Date(inventory.createdAt);
        inventory.createdAt.setHours(0, 0, 0, 0);
        if (inventory.createdAt.getTime() == yesterday.getTime()) {
          yesterdayQuantity++;
        } else if (inventory.createdAt > twoWeekAgo) {
          twoWeekAgoQuantity++;
        } else if (inventory.createdAt > twoMonthsAgo) {
          twoMonthsAgoQuantity++;
        } else if (inventory.createdAt > twoYearsAgo) {
          twoYearsAgoQuantity++;
        }
      }
    });
    let inventoriesComparison = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return inventoriesComparison;
  };

  const getNewProperties = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;

    propertiesFromDB.forEach((property) => {
      if (property.createdAt != null) {
        property.createdAt = new Date(property.createdAt);
        property.createdAt.setHours(0, 0, 0, 0);
        if (property.createdAt.getTime() == today.getTime()) {
          todayQuantity++;
        } else if (property.createdAt > lastWeek) {
          lastWeekQuantity++;
        } else if (property.createdAt > lastMonth) {
          lastMonthQuantity++;
        } else if (property.createdAt > lastYear) {
          lastYearQuantity++;
        }
      }
    });
    let newPropertiesComparison = getNewPropertiesComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      newPropertiesComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      newPropertiesComparison.twoWeekAgoQuantity
    );
    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      newPropertiesComparison.twoMonthsAgoQuantity
    );
    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      newPropertiesComparison.twoYearsAgoQuantity
    );

    let newProperties = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return newProperties;
  };

  const getNewPropertiesComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    propertiesFromDB.forEach((property) => {
      if (property.createdAt != null) {
        property.createdAt = new Date(property.createdAt);
        property.createdAt.setHours(0, 0, 0, 0);
        if (property.createdAt.getTime() == yesterday.getTime()) {
          yesterdayQuantity++;
        } else if (property.createdAt > twoWeekAgo) {
          twoWeekAgoQuantity++;
        } else if (property.createdAt > twoMonthsAgo) {
          twoMonthsAgoQuantity++;
        } else if (property.createdAt > twoYearsAgo) {
          twoYearsAgoQuantity++;
        }
      }
    });
    let newPropertiesComparison = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return newPropertiesComparison;
  };

  const getNewCustomers = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;

    customers.forEach((customer) => {
      if (customer.createdAt != null) {
        customer.createdAt = new Date(customer.createdAt);
        customer.createdAt.setHours(0, 0, 0, 0);
        if (customer.createdAt.getTime() == today.getTime()) {
          todayQuantity++;
        } else if (customer.createdAt > lastWeek) {
          lastWeekQuantity++;
        } else if (customer.createdAt > lastMonth) {
          lastMonthQuantity++;
        } else if (customer.createdAt > lastYear) {
          lastYearQuantity++;
        }
      }
    });
    let newCustomersComparison = getNewCustomersComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      newCustomersComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      newCustomersComparison.twoWeekAgoQuantity
    );
    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      newCustomersComparison.twoMonthsAgoQuantity
    );
    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      newCustomersComparison.twoYearsAgoQuantity
    );

    let newCustomers = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return newCustomers;
  };

  const getNewCustomersComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    customers.forEach((customer) => {
      if (customer.createdAt != null) {
        customer.createdAt = new Date(customer.createdAt);
        customer.createdAt.setHours(0, 0, 0, 0);
        if (customer.createdAt.getTime() == yesterday.getTime()) {
          yesterdayQuantity++;
        } else if (customer.createdAt > twoWeekAgo) {
          twoWeekAgoQuantity++;
        } else if (customer.createdAt > twoMonthsAgo) {
          twoMonthsAgoQuantity++;
        } else if (customer.createdAt > twoYearsAgo) {
          twoYearsAgoQuantity++;
        }
      }
    });
    let newCustomerComparison = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return newCustomerComparison;
  };

  const getPosts = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;

    postsFromDB.forEach((post) => {
      if (post.createdAt != null) {
        post.createdAt = new Date(post.createdAt);
        post.createdAt.setHours(0, 0, 0, 0);
        if (post.createdAt.getTime() == today.getTime()) {
          todayQuantity++;
        } else if (post.createdAt > lastWeek) {
          lastWeekQuantity++;
        } else if (post.createdAt > lastMonth) {
          lastMonthQuantity++;
        } else if (post.createdAt > lastYear) {
          lastYearQuantity++;
        }
      }
    });
    let postsComparison = getPostsComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      postsComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      postsComparison.twoWeekAgoQuantity
    );

    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      postsComparison.twoMonthsAgoQuantity
    );
    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      postsComparison.twoYearsAgoQuantity
    );

    let posts = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return posts;
  };

  const getPostsComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    postsFromDB.forEach((post) => {
      if (post.createdAt != null) {
        post.createdAt = new Date(post.createdAt);
        post.createdAt.setHours(0, 0, 0, 0);
        if (post.createdAt.getTime() == yesterday.getTime()) {
          yesterdayQuantity++;
        } else if (post.createdAt > twoWeekAgo) {
          twoWeekAgoQuantity++;
        } else if (post.createdAt > twoMonthsAgo) {
          twoMonthsAgoQuantity++;
        } else if (post.createdAt > twoYearsAgo) {
          twoYearsAgoQuantity++;
        }
      }
    });
    let postsComparison = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return postsComparison;
  };

  const getAvailableProperties = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    let lastMonth = new Date(new Date().setDate(new Date().getDate() - 30));
    let lastYear = new Date(new Date().setDate(new Date().getDate() - 365));

    let todayQuantity = 0;
    let lastWeekQuantity = 0;
    let lastMonthQuantity = 0;
    let lastYearQuantity = 0;
    postsFromDB.forEach((post) => {
      if (
        post.status[0] != "Pendiente" &&
        post.isForRent == true &&
        post.isForSale == true
      ) {
        let startDate = new Date(post.startDate);
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(post.endDate);
        endDate.setHours(0, 0, 0, 0);
        let todayState = false;
        let lastWeekState = false;
        let lastMonthState = false;
        let lastYearState = false;
        for (let index = 0; startDate <= endDate; index++) {
          if (startDate.getTime() == today.getTime()) {
            todayState = true;
          } else if (startDate > lastWeek) {
            lastWeekState = true;
          } else if (startDate > lastMonth) {
            lastMonthState = true;
          } else if (startDate > lastYear) {
            lastYearState = true;
          }
          startDate.setDate(startDate.getDate() + 1);
        }
        todayQuantity = todayState == true ? todayQuantity + 1 : todayQuantity;
        lastWeekQuantity =
          lastWeekState == true ? lastWeekQuantity + 1 : lastWeekQuantity;
        lastMonthQuantity =
          lastMonthState == true ? lastMonthQuantity + 1 : lastMonthQuantity;
        lastYearQuantity =
          lastYearState == true ? lastYearQuantity + 1 : lastYearQuantity;
        todayState = false;
        lastWeekState = false;
        lastMonthState = false;
        lastYearState = false;
      }
    });
    let propertiesComparison = getAvailablePropertiesComparison();
    let percentageTodayYesterday = getPercentage(
      todayQuantity,
      propertiesComparison.yesterdayQuantity
    );
    let percentageLastWeekTwoWeekAgo = getPercentage(
      lastWeekQuantity,
      propertiesComparison.twoWeekAgoQuantity
    );
    let percentageLastMonthTwoMonthAgo = getPercentage(
      lastMonthQuantity,
      propertiesComparison.twoMonthsAgoQuantity
    );
    let percentageLastYearTwoYearsAgo = getPercentage(
      lastYearQuantity,
      propertiesComparison.twoYearsAgoQuantity
    );

    let propertiesReport = {
      todayQuantity,
      lastWeekQuantity,
      lastMonthQuantity,
      lastYearQuantity,
      percentageTodayYesterday,
      percentageLastWeekTwoWeekAgo,
      percentageLastMonthTwoMonthAgo,
      percentageLastYearTwoYearsAgo,
    };
    return propertiesReport;
  };

  const getAvailablePropertiesComparison = () => {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    yesterday.setHours(0, 0, 0, 0);
    let twoWeekAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    let twoMonthsAgo = new Date(new Date().setDate(new Date().getDate() - 60));
    let twoYearsAgo = new Date(new Date().setDate(new Date().getDate() - 730));

    let yesterdayQuantity = 0;
    let twoWeekAgoQuantity = 0;
    let twoMonthsAgoQuantity = 0;
    let twoYearsAgoQuantity = 0;

    postsFromDB.forEach((post) => {
      if (
        post.status[0] != "Pendiente" &&
        post.isForRent == true &&
        post.isForSale == true
      ) {
        let startDate = new Date(post.startDate);
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(post.endDate);
        endDate.setHours(0, 0, 0, 0);
        let yesterdayState = false;
        let twoWeekAgoState = false;
        let twoMonthAgoState = false;
        let twoYearAgoState = false;
        for (let index = 0; startDate <= endDate; index++) {
          if (startDate.getDay() == yesterday.getDay()) {
            yesterdayState = true;
          } else if (startDate > twoWeekAgo) {
            twoWeekAgoState = true;
          } else if (startDate > twoMonthsAgo) {
            twoMonthAgoState = true;
          } else if (startDate > twoYearsAgo) {
            twoYearAgoState = true;
          }
          startDate.setDate(startDate.getDate() + 1);
        }
        yesterdayQuantity =
          yesterdayState == true ? yesterdayQuantity + 1 : yesterdayQuantity;
        twoWeekAgoQuantity =
          twoWeekAgoState == true ? twoWeekAgoQuantity + 1 : twoWeekAgoQuantity;
        twoMonthsAgoQuantity =
          twoMonthAgoState == true
            ? twoMonthsAgoQuantity + 1
            : twoMonthsAgoQuantity;
        twoYearsAgoQuantity =
          twoYearAgoState == true
            ? twoYearsAgoQuantity + 1
            : twoYearsAgoQuantity;
        yesterdayState = false;
        twoWeekAgoState = false;
        twoMonthAgoState = false;
        twoYearAgoState = false;
      }
    });

    let propertiesComparison = {
      yesterdayQuantity,
      twoWeekAgoQuantity,
      twoMonthsAgoQuantity,
      twoYearsAgoQuantity,
    };
    return propertiesComparison;
  };

  return (
    <ReportsContext.Provider
      value={{
        getPropertyWithLargestArea,
        getPropertyWithLessArea,
        getCustomerWithMoreProperties,
        getAvailableProperties,
        getAvailablePropertiesForRent,
        getAvailablePropertiesForSale,
        getCustomersWithoutProperties,
        getRentedProperties,
        getSoldProperties,
        getInventories,
        getNewProperties,
        getNewCustomers,
        fetchInventories,
        getPosts,
        propertiesFromDB,
      }}
    >
      {props.children}
    </ReportsContext.Provider>
  );
};

export default ReportsState;
