import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutOne } from "../../layouts";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { Sidebar, ShopHeader, ShopProducts } from "../../components/Shop";
import { productService, bannerService } from '../../api-services/';

const ListLeftSidebar = ({ products, bannerProduct }) => {
  const [layout, setLayout] = useState("list");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [categoryViewing, setCategoryViewing] = useState(null);

  const pageLimit = 12;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const viewCategory = (value) => {
    setCategoryViewing(value);
  }

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    // let sortedProducts = getSortedProducts(products, sortType, sortValue);
    // const filterSortedProducts = getSortedProducts(
    //   sortedProducts,
    //   filterSortType,
    //   filterSortValue
    // );
    // sortedProducts = filterSortedProducts;
    // setSortedProducts(sortedProducts);
    // setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
    let arr = [];
    if(!categoryViewing) {
      arr = products;
    } else {
      arr = products.filter(m => m.category.id === categoryViewing.id);
    }
    setCurrentData(arr);
  }, [categoryViewing]);

  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Shop">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Category</li>
        </ol>
      </BreadcrumbOne>
      <div className="shop-content space-pt--r100 space-pb--r100">
        <Container>
          <Row>
            <Col lg={9}>
              {/* shop page header */}
              <ShopHeader
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                shopTopFilterStatus={shopTopFilterStatus}
                setShopTopFilterStatus={setShopTopFilterStatus}
                layout={layout}
              />
              {/* shop products */}
              <ShopProducts layout={layout} products={currentData} />

              {/* shop product pagination */}
              <div className="pagination pagination-style pagination-style--two justify-content-center">
                <Paginator
                  totalRecords={sortedProducts.length}
                  pageLimit={pageLimit}
                  pageNeighbours={2}
                  setOffset={setOffset}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageContainerClass="mb-0 mt-0"
                  pagePrevText="«"
                  pageNextText="»"
                />
              </div>
            </Col>
            <Col lg={3} className="order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
              {/* sidebar */}
              <Sidebar banner={bannerProduct} products={products} viewCategory={viewCategory} />
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutOne>
  );
};

export async function getServerSideProps({query}) {
  const {q, category} = query;
  const products = await productService.get(q, 10, 1, category);
  const bannerProduct = await bannerService.getBannerProductSidebar();

  return {
    props: {
      products: products.data.data || [],
      bannerProduct: bannerProduct || [],
    },
  };
};

export default ListLeftSidebar;
