import { pool,sequelize } from '../postgres.js'

const Product = {};

Product.getProduct = async ( sellerData ) => {
    let result={status:"success",msg:"success"}
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const {  
        seller,
        product
      } = sellerData;

      const query1 = 'SELECT * '+  
                     'from product as P '+
                     '  left join product_info as PI '+
                     '  on PI.product = P.id  '+
                     '  left join product_sell as PS '+
                     '  on PS.product = P.id  '+
                     'WHERE P.id=$1 '+
                     'ORDER BY P.created_at;'
      const params1 = [product];
      const res1 = await client.query(query1, params1)
      console.log('res1 :', res1);
      result.data=res1.rows[0];
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      result.status="DB_ERROR"
      result.msg=e
      throw e
    } finally {
      client.release()
      return result;
    }
  }

Product.getAllProduct = async ( sellerData ) => {
    let result={status:"success",msg:"success"}
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const {  
        seller
      } = sellerData;

      const query1 = 'SELECT * '+  
                     'from product as P '+
                     '  left join product_info as PI '+
                     '  on PI.product = P.id  '+
                     '  left join product_sell as PS '+
                     '  on PS.product = P.id  '+
                     'WHERE PI.seller=$1 '+
                     'ORDER BY P.created_at;'
      const params1 = [seller];
      const res1 = await client.query(query1, params1)
      console.log('res1 :', res1);
      result.data=res1.rows;
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      result.status="DB_ERROR"
      result.msg=e
      throw e
    } finally {
      client.release()
      return result;
    }
  }


Product.createProduct = async ( product ) => {
    let result={status:"success",msg:"success"}
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const {  
        name,description,brand,category,sub_category,img_file_name,img_file,
        price,qty,has_variant,payment_method,shipping_method,notice,sale_status,selling_mode,
        group_buy_end_date,group_buy_upper_qty,group_buy_lower_qty,group_buy_discount,group_buy_price,variant,seller
    } = product;


      //新增照片到s3
      if(img_file&&img_file_name){
        //const imgUrl = uploadImg(img_file,img_file_name);
      }

      const imgUrl="https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/snacks-in-america.jpg?quality=82&strip=all";

      const query1 = 'INSERT INTO product (name, description, price, has_variant, sale_status ) VALUES($1, $2, $3, $4, $5) RETURNING id;'
      const params1 = [name,description,price,has_variant,sale_status];
      const res1 = await client.query(query1, params1)
      console.log('res1 :', res1);

      const productId = res1.rows[0].id;

      const query2 = 'INSERT INTO product_info (product, category, sub_category, brand, seller, img_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING id;'
      const params2 = [productId,category,sub_category,brand,seller,imgUrl];
      const res2 = await client.query(query2, params2);
      console.log('res2 :', res2);

      if(has_variant) {
          for(let item in variant){
              let {name,price,qty,imgUrl}=item;
              const query3 = 'INSERT INTO product_variant(product, name, price, qty, img_url) VALUES($1, $2, $3, $4, $5) RETURNING id;'
              const params3 = [productId,name,price,qty,imgUrl];
              const res3 = await client.query(query3, params3)
              console.log('res3 :', res3);
          }
      }

      const query4 = 'INSERT INTO product_sell (product, qty, selling_mode, payment_method,shipping_method, group_buy_upper_qty, group_buy_lower_qty, group_buy_end_date,group_buy_discount,group_buy_price, notice) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;'
      const params4 = [productId,qty,selling_mode,payment_method,shipping_method,group_buy_upper_qty,group_buy_lower_qty,group_buy_end_date,group_buy_discount,group_buy_price,notice];
      const res4 = await client.query(query4, params4)
      const productSellStatusId = res4.rows[0].id;
      console.log('res4 :', res4);
      await client.query('COMMIT')
      return result;
    } catch (e) {
      await client.query('ROLLBACK')
      result.status="DB_ERROR"
      result.msg=e
      throw e
    } finally {
      client.release()
      return result;
    }
  }

async function readProduct(){
  const client = await pool.connect()
  try {
    const query1 = 'SELECT * FROM product; '
    const params1 = [];
    const res1 = await client.query(query1, params1);
    console.log('res1 :', res1);
    // const res1 = await client.query("SELECT NOW()");
    // console.log('res1 :', res1);


  }catch (e) {
  console.log('e :', e);
  }
}


function insertProductVariant(){

}

function insertProductInventory(){

}

const qryUser = async (userId) => {
    const qryUser = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
      userId,
    ]);
    return qryUser.rows[0];
};

export default Product;
