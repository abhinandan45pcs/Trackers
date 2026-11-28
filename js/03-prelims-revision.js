
// ======================================================
// TOOL 1: PRELIMS REVISION TRACKER (data saved to Firebase users/{uid}.revision)
// ======================================================
const RevisionTool = (function () {
  const SEED = {"subjects":["Economics","Polity","Modern Indian History","Geography"],"data":{"Economics":[{"id":"eco-1","name":"1. Poverty & Inequality","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-2","name":"2. Unemployment","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-3","name":"3. Basic Concepts of Economics","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-4","name":"4. National Income Accounting","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-5","name":"5. Inflation","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-6","name":"6. Money and Monetary Policy","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-7","name":"7. Functions of RBI","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-8","name":"8. Capital markets - Banking","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-9","name":"9. NABARD and NBFCs","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-10","name":"10. Capital Markets","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-11","name":"11. External sector","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-12","name":"12. Government Budgeting and Fiscal Policy","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"eco-13","name":"13. Goods and Services Tax","lastRevised":"","status":"Not Started","note":"","revisionCount":0}],"Polity":[{"id":"pol-1","name":"1. Historical Background","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-2","name":"2. Making of the Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-3","name":"3. Concept of Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-4","name":"4. Salient Features of the Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-5","name":"5. Preamble of the Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-6","name":"6. Union and its Territory","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-7","name":"7. Citizenship","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-8","name":"8. Fundamental Rights","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-9","name":"9. Directive Principles of State Policy","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-10","name":"10. Fundamental Duties","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-11","name":"11. Amendment of the Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-12","name":"12. Basic Structure of the Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-13","name":"13. Parliamentary System","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-14","name":"14. Federal System","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-15","name":"15. Centre–State Relations","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-16","name":"16. Inter-State Relations","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-17","name":"17. Emergency Provisions","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-18","name":"18. President","lastRevised":"2026-11-21","status":"Not Started","note":"","revisionCount":1},{"id":"pol-19","name":"19. Vice-President","lastRevised":"2026-11-21","status":"Not Started","note":"","revisionCount":1},{"id":"pol-20","name":"20. Prime Minister","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-21","name":"21. Central Council of Ministers","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-22","name":"22. Cabinet Committees","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-23","name":"23. Parliament","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-24","name":"24. Parliamentary Committees","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-25","name":"25. Parliamentary Group","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-26","name":"26. Supreme Court","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-27","name":"27. Judicial Review","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-28","name":"28. Judicial Activism","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-29","name":"29. Public Interest Litigation","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-30","name":"30. Governor","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-31","name":"31. Chief Minister","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-32","name":"32. State Council of Ministers","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-33","name":"33. State Legislature","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-34","name":"34. High Court","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-35","name":"35. Subordinate Courts","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-36","name":"36. Tribunals","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-37","name":"37. National Consumer Disputes Redressal Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-38","name":"38. Lok Adalat and Other Courts","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-39","name":"39. Panchayati Raj","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-40","name":"40. Municipalities","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-41","name":"41. Union Territories","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-42","name":"42. Scheduled and Tribal Areas","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-43","name":"43. Election Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-44","name":"44. Union Public Service Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-45","name":"45. State Public Service Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-46","name":"46. Finance Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-47","name":"47. Goods and Services Tax Council","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-48","name":"48. National Commission for SCs","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-49","name":"49. National Commission for STs","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-50","name":"50. National Commission for BCs","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-51","name":"51. Special Officer for Linguistic Minorities","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-52","name":"52. Comptroller and Auditor General of India","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-53","name":"53. Attorney General of India","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-54","name":"54. Advocate General of the State","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-55","name":"55. Constitutional Prescriptions","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-56","name":"56. NITI Aayog","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-57","name":"57. National Human Rights Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-58","name":"58. State Human Rights Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-59","name":"59. National Commission for Women","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-60","name":"60. National Commission for Protection of Child Rights","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-61","name":"61. National Commission for Minorities","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-62","name":"62. Central Information Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-63","name":"63. State Information Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-64","name":"64. Central Vigilance Commission","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-65","name":"65. Central Bureau of Investigation","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-66","name":"66. Lokpal and Lokayuktas","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-67","name":"67. National Investigation Agency","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-68","name":"68. National Disaster Management Authority","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-69","name":"69. Bar Council of India","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-70","name":"70. Law Commission of India","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-71","name":"71. Delimitation Commission of India","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-72","name":"72. Co-operative Societies","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-73","name":"73. Official Language","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-74","name":"74. Public Services","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-75","name":"75. Rights and Liabilities of the Government","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-76","name":"76. Special Provisions Relating to Certain Classes","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-77","name":"77. Special Provisions for Some States","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-78","name":"78. Political Parties","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-79","name":"79. Role of Regional Parties","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-80","name":"80. Elections","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-81","name":"81. Election Laws","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-82","name":"82. Electoral Reforms","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-83","name":"83. Voting Behaviour","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-84","name":"84. Coalition Government","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-85","name":"85. Anti-Defection Law","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-86","name":"86. Pressure Groups","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-87","name":"87. National Integration","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-88","name":"88. Foreign Policy","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-89","name":"89. National Commission to Review the Working of the Constitution","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-90","name":"90. Landmark Judgements and their Impact","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-91","name":"91. Important Doctrines of Constitutional Interpretation","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"pol-92","name":"92. World Constitutions","lastRevised":"","status":"Not Started","note":"","revisionCount":0}],"Modern Indian History":[{"id":"mih-1","name":"1. Mughal Background","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-2","name":"2. 1707 Decline of Mughals","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-3","name":"3. Successor States","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-4","name":"4. Rise of Marathas & Maratha Administration","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-5","name":"5. Jats and Afghans","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-6","name":"6. Sikh State","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-7","name":"7. Rajputs, Mysore, Travancore","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-8","name":"8. Advent of Europeans","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-9","name":"9. Carnatic Wars 1746-63","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-10","name":"10. Battle of Plassey 1757 & Battle of Buxar 1764","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-11","name":"11. Subsidiary Alliance of Wellesley (1798-1805)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-12","name":"12. Anglo-Mysore Wars 1766-99 & Travancore & Carnatic","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-13","name":"13. Anglo-Maratha Wars (1775-1819) till 1848","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-14","name":"14. 1848-56 Dalhousie Annexations & Policies","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-15","name":"15. British Imperial Ideology","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-16","name":"16. Land Revenue","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-17","name":"17. 1773 Regulating Act to 1858 GOI Act","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-18","name":"18. EIC Administration","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-19","name":"19. Social Reforms, Education Reforms & Print Culture","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-20","name":"20. Pre-1857 Peasant Revolts & Tribal Uprisings","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-21","name":"21. 1857 Revolt","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-22","name":"22. Post-1857 Peasant Revolts","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-23","name":"23. Pre-1885 INM","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-24","name":"24. INC 1885 & English Political Reformers","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-25","name":"25. ICA 1861","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-26","name":"26. Moderates in INC - Ideology, Demands, Negatives","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-27","name":"27. Moderates Positives & Drain Theory","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-28","name":"28. ICA 1892","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-29","name":"29. 1905-08 Extremists & Swadeshi Movement","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-30","name":"30. Revolutionaries of Swadeshi Movement","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-31","name":"31. ML 1906 & ICA 1909","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-32","name":"32. Ghadar Movement 1913-15","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-33","name":"33. Home Rule League & Lucknow Pact 1916","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-34","name":"34. GOI 1919","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-35","name":"35. Gandhiji in South Africa","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-36","name":"36. Mahatma Gandhi - Ideology","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-37","name":"37. Gandhian Era till 1927","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-38","name":"38. Peasant Movements 1920s & 1930s","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-39","name":"39. Revolutionaries of 1920s-30s","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-40","name":"40. Simon 1927 to Delhi Manifesto Nov 1929","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-41","name":"41. Lahore Session 1929 to CDM 1930-34","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-42","name":"42. GOI 1935, Congress Ministries 1937-39","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-43","name":"43. WWII 1939 to Cripps 1942","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-44","name":"44. Quit India Movement 1942-45","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-45","name":"45. Bengal Famine, INA Agitations, INA & Naval Mutiny","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-46","name":"46. Rajaji Formula 1944 to Partition","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"mih-47","name":"47. Many Voices of the Nation - Workers, Capitalists, Dalits, Women","lastRevised":"","status":"Not Started","note":"","revisionCount":0}],"Geography":[{"id":"geo-1","name":"1.  Universe and Earth                  (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-2","name":"2.  Interior of the Earth               (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-3","name":"3.  Rocks and Rock Cycle                (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-4","name":"4.  Earthquakes and Earth Movements     (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-5","name":"5.  Volcanoes                           (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-6","name":"6.  Plate Tectonics Theory              (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-7","name":"7.  Orogeny                             (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-8","name":"8.  Cycles of Erosion                   (Geomorphology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-9","name":"9.  Atmosphere                          (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-10","name":"10. Air Pressure and Pressure Belts     (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-11","name":"11. Winds                               (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-12","name":"12. Humidity and Condensation           (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-13","name":"13. Clouds                              (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-14","name":"14. Precipitation                       (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-15","name":"15. Atmospheric Disturbances            (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-16","name":"16. Air Masses                          (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-17","name":"17. Fronts                              (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-18","name":"18. Cyclones                            (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-19","name":"19. Climate Change                      (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-20","name":"20. Climatic Classification             (Climatology)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-21","name":"21. Oceanography                        (Oceanography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-22","name":"22. Location and Physiography of India  (Indian Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-23","name":"23. Indian Drainage System               (Indian Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-24","name":"24. Indian Climate                      (Indian Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-25","name":"25. Indian Forests and Soils            (Indian Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-26","name":"26. Indian Waterfalls                   (Indian Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-27","name":"27. Demography                          (Human Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-28","name":"28. Settlements                         (Human Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-29","name":"29. World Resources                     (Economic Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-30","name":"30. Agriculture                         (Economic Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-31","name":"31. Industries                          (Economic Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0},{"id":"geo-32","name":"32. Transport and Communication         (Economic Geography)","lastRevised":"","status":"Not Started","note":"","revisionCount":0}]}};
  const EXTRA_SUBJECTS = ['Environment','Sci & Tech','Mapping','AMAC','International Relations'];
  const DEFAULT_SUBJECTS = [...SEED.subjects, ...EXTRA_SUBJECTS];

  // ── Constitutional Articles ───────────────────────────────────────────────────
  const ARTICLES = [
    // PART I — Union and Territory
    { num:"Article 1",   part:"Part I — Union & Territory",    title:"Name and Territory of the Union", desc:"India, that is Bharat, shall be a Union of States. The territory of India shall consist of the territories of the States, Union Territories, and any territory that may be acquired." },
    { num:"Article 2",   part:"Part I — Union & Territory",    title:"Admission of New States", desc:"Parliament may by law admit into the Union, or establish, new States on such terms and conditions as it thinks fit." },
    { num:"Article 3",   part:"Part I — Union & Territory",    title:"Formation of New States", desc:"Parliament may by law form a new State by separation of territory from any State, or by uniting two or more States, or by uniting any territory to a part of any State. A Bill for this purpose cannot be introduced without the President's recommendation." },
    { num:"Article 4",   part:"Part I — Union & Territory",    title:"Laws under Articles 2 & 3", desc:"Laws made under Articles 2 and 3 must include provisions for amending the First and Fourth Schedules as necessary. Such laws are not deemed amendments under Article 368." },
    // PART II — Citizenship
    { num:"Article 5",   part:"Part II — Citizenship",         title:"Citizenship at Commencement", desc:"Every person who had his domicile in India and was born in India, or had either parent born in India, or had been ordinarily resident in India for at least 5 years before the commencement of the Constitution, became a citizen." },
    { num:"Article 6",   part:"Part II — Citizenship",         title:"Citizenship of Migrants from Pakistan", desc:"Persons who migrated to India from Pakistan before July 19, 1948, became citizens automatically. Those who migrated after that date had to register with an officer." },
    { num:"Article 7",   part:"Part II — Citizenship",         title:"Citizenship of Migrants to Pakistan", desc:"Persons who had migrated to Pakistan after March 1, 1947, shall not be deemed citizens of India. However, they can return under a permit and register." },
    { num:"Article 8",   part:"Part II — Citizenship",         title:"Citizenship of Persons of Indian Origin Abroad", desc:"Persons of Indian origin residing outside India can be registered as citizens by diplomatic or consular representatives of India." },
    { num:"Article 9",   part:"Part II — Citizenship",         title:"Voluntary Foreign Citizenship", desc:"A person who voluntarily acquires citizenship of a foreign State shall not be a citizen of India." },
    { num:"Article 10",  part:"Part II — Citizenship",         title:"Continuance of Citizenship Rights", desc:"Every person who is or is deemed to be a citizen of India under the preceding provisions shall continue to be a citizen subject to any law made by Parliament." },
    { num:"Article 11",  part:"Part II — Citizenship",         title:"Parliament to Regulate Citizenship", desc:"Parliament has the power to make any provision with respect to the acquisition and termination of citizenship and all other matters relating to citizenship." },
    // PART III — Fundamental Rights
    { num:"Article 12",  part:"Part III — Fundamental Rights", title:"Definition of 'State'", desc:"'State' includes: (a) Government and Parliament of India, (b) Government and Legislature of each State, (c) all local or other authorities within the territory of India or under the control of Government of India." },
    { num:"Article 13",  part:"Part III — Fundamental Rights", title:"Laws Inconsistent with Fundamental Rights Void", desc:"All pre-constitutional laws inconsistent with Fundamental Rights are void to that extent. The State shall not make any law that takes away or abridges Fundamental Rights. This is the basis of judicial review in India." },
    { num:"Article 14",  part:"Part III — Fundamental Rights", title:"Right to Equality", desc:"The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. This is available to both citizens and foreigners." },
    { num:"Article 15",  part:"Part III — Fundamental Rights", title:"Prohibition of Discrimination", desc:"The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, or place of birth. However, special provisions can be made for women, children, and socially/educationally backward classes (including SCs and STs)." },
    { num:"Article 16",  part:"Part III — Fundamental Rights", title:"Equality of Opportunity in Public Employment", desc:"There shall be equality of opportunity for all citizens in matters of employment or appointment to any office under the State. Reservation for backward classes, SCs, STs is permissible." },
    { num:"Article 17",  part:"Part III — Fundamental Rights", title:"Abolition of Untouchability", desc:"Untouchability is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of untouchability shall be an offence punishable in accordance with law. The Protection of Civil Rights Act, 1955, was enacted under this Article." },
    { num:"Article 18",  part:"Part III — Fundamental Rights", title:"Abolition of Titles", desc:"No title, not being a military or academic distinction, shall be conferred by the State. No citizen of India shall accept any title from any foreign State. Bharat Ratna and Padma awards were questioned under this Article but upheld by the Supreme Court." },
    { num:"Article 19",  part:"Part III — Fundamental Rights", title:"Six Fundamental Freedoms", desc:"All citizens have: (a) Freedom of speech and expression, (b) Right to assemble peaceably without arms, (c) Right to form associations or unions, (d) Right to move freely throughout India, (e) Right to reside and settle anywhere, (f) Right to practise any profession or carry on any occupation/trade/business. Reasonable restrictions can be imposed." },
    { num:"Article 20",  part:"Part III — Fundamental Rights", title:"Protection in Respect of Conviction for Offences", desc:"(1) No ex-post-facto laws — a person cannot be convicted for an act that was not an offence when committed. (2) No double jeopardy — no person shall be prosecuted and punished for the same offence more than once. (3) No self-incrimination — no person accused of an offence shall be compelled to be a witness against himself." },
    { num:"Article 21",  part:"Part III — Fundamental Rights", title:"Protection of Life and Personal Liberty", desc:"No person shall be deprived of his life or personal liberty except according to procedure established by law. The Supreme Court has interpreted this to include: right to privacy, right to live with dignity, right to livelihood, right to health, right to education, right to a clean environment, and right to speedy trial. Called the 'repository of all residual rights'." },
    { num:"Article 21A", part:"Part III — Fundamental Rights", title:"Right to Education (86th Amendment, 2002)", desc:"The State shall provide free and compulsory education to all children between the ages of 6 and 14 years in such manner as the State may, by law, determine. The Right to Education Act, 2009, was enacted under this provision." },
    { num:"Article 22",  part:"Part III — Fundamental Rights", title:"Protection Against Arbitrary Arrest & Detention", desc:"No person who is arrested shall be detained without being informed of the grounds of arrest. They have the right to consult a legal practitioner of their choice. They must be produced before a magistrate within 24 hours. Exceptions apply for enemy aliens and preventive detention laws." },
    { num:"Article 23",  part:"Part III — Fundamental Rights", title:"Prohibition of Traffic in Human Beings and Forced Labour", desc:"Traffic in human beings, begar, and other similar forms of forced labour are prohibited and shall be an offence punishable by law. The Bonded Labour System (Abolition) Act, 1976, was enacted under this." },
    { num:"Article 24",  part:"Part III — Fundamental Rights", title:"Prohibition of Child Labour", desc:"No child below the age of fourteen years shall be employed to work in any factory, mine, or in any other hazardous employment. The Child Labour (Prohibition and Regulation) Act, 1986, operationalises this." },
    { num:"Article 25",  part:"Part III — Fundamental Rights", title:"Freedom of Conscience and Religion", desc:"All persons are equally entitled to freedom of conscience and the right freely to profess, practise, and propagate religion, subject to public order, morality, and health. The State can regulate secular activities associated with religion." },
    { num:"Article 26",  part:"Part III — Fundamental Rights", title:"Freedom to Manage Religious Affairs", desc:"Subject to public order, morality, and health, every religious denomination has the right to: establish/maintain institutions for religious and charitable purposes; manage its own affairs in matters of religion; own and acquire movable/immovable property." },
    { num:"Article 27",  part:"Part III — Fundamental Rights", title:"No Tax for Promotion of Religion", desc:"No person shall be compelled to pay any taxes, the proceeds of which are specifically appropriated in payment of expenses for the promotion or maintenance of any particular religion or religious denomination." },
    { num:"Article 28",  part:"Part III — Fundamental Rights", title:"Freedom from Religious Instruction in State Institutions", desc:"No religious instruction shall be provided in any educational institution wholly maintained out of State funds. Institutions administered by the State but established under a religious endowment may provide religious instruction." },
    { num:"Article 29",  part:"Part III — Fundamental Rights", title:"Protection of Interests of Minorities", desc:"Any section of citizens having a distinct language, script, or culture shall have the right to conserve the same. No citizen shall be denied admission to any educational institution maintained by the State on grounds of religion, race, caste, or language." },
    { num:"Article 30",  part:"Part III — Fundamental Rights", title:"Right of Minorities to Establish Educational Institutions", desc:"All minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice. The State shall not, in granting aid, discriminate against such institutions." },
    { num:"Article 32",  part:"Part III — Fundamental Rights", title:"Right to Constitutional Remedies — 'Heart & Soul of the Constitution'", desc:"The right to move the Supreme Court for enforcement of Fundamental Rights is guaranteed. Dr. Ambedkar called this 'the most important article — without which the Constitution would be a nullity'. The Supreme Court can issue writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari." },
    { num:"Article 33",  part:"Part III — Fundamental Rights", title:"Modification of Fundamental Rights for Armed Forces", desc:"Parliament may by law determine to what extent any of the Fundamental Rights shall apply to: members of the armed forces, members of forces charged with maintenance of public order, persons employed in any bureau or other organisation established by the State for purposes of intelligence or counter-intelligence." },
    { num:"Article 34",  part:"Part III — Fundamental Rights", title:"Restriction of Fundamental Rights during Martial Law", desc:"Parliament may by law indemnify any person in the service of the Union or of a State in respect of any act done by him in connection with the maintenance or restoration of order in any area where martial law was in force." },
    { num:"Article 35",  part:"Part III — Fundamental Rights", title:"Legislation to Give Effect to Fundamental Rights", desc:"Parliament alone has the power to make laws prescribing punishment for offences against Articles 17, 23, and 24, and to prescribe residence requirements for employment in a State, even if these touch on state subjects." },
    // PART IV — DPSPs
    { num:"Article 36",  part:"Part IV — DPSP",                title:"Definition of State (DPSP)", desc:"In Part IV (DPSPs), 'State' has the same meaning as in Part III (Fundamental Rights) — includes Parliament, state legislatures, and all local and other authorities." },
    { num:"Article 37",  part:"Part IV — DPSP",                title:"Application of DPSPs", desc:"The DPSPs shall not be enforceable by any court, but these principles are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply them in making laws." },
    { num:"Article 38",  part:"Part IV — DPSP",                title:"State to Secure Social Order", desc:"The State shall strive to promote the welfare of the people by securing and protecting a social order in which justice — social, economic, and political — shall inform all institutions of national life. The State shall minimise inequalities in income, status, facilities, and opportunities." },
    { num:"Article 39",  part:"Part IV — DPSP",                title:"Certain Principles of Policy (Socialist)", desc:"The State shall direct its policy towards: (a) adequate means of livelihood for all citizens; (b) distribution of ownership and control of material resources for common good; (c) preventing concentration of wealth and means of production; (d) equal pay for equal work for men and women; (e) protection of the health and strength of workers; (f) childhood and youth protection against exploitation." },
    { num:"Article 39A", part:"Part IV — DPSP",                title:"Equal Justice and Free Legal Aid (42nd Amendment, 1976)", desc:"The State shall secure that the operation of the legal system promotes justice on a basis of equal opportunity, and shall provide free legal aid to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities." },
    { num:"Article 40",  part:"Part IV — DPSP",                title:"Organisation of Village Panchayats (Gandhian)", desc:"The State shall take steps to organise village panchayats and endow them with such powers and authority as may be necessary to enable them to function as units of self-government. The 73rd Amendment (1992) gave constitutional status to Panchayati Raj." },
    { num:"Article 41",  part:"Part IV — DPSP",                title:"Right to Work, Education, and Public Assistance", desc:"The State shall, within the limits of its economic capacity and development, make effective provision for securing the right to work, to education, and to public assistance in cases of unemployment, old age, sickness, and disablement." },
    { num:"Article 42",  part:"Part IV — DPSP",                title:"Just and Humane Conditions of Work and Maternity Relief", desc:"The State shall make provision for securing just and humane conditions of work and for maternity relief. This has been operationalised through the Maternity Benefit Act, 1961, and the Factories Act." },
    { num:"Article 43",  part:"Part IV — DPSP",                title:"Living Wage for Workers (Gandhian)", desc:"The State shall endeavour to secure, by suitable legislation or economic organisation or in any other way, to all workers — agricultural, industrial, or otherwise — a living wage, conditions of work ensuring a decent standard of life, and full enjoyment of leisure and social and cultural opportunities." },
    { num:"Article 43A", part:"Part IV — DPSP",                title:"Workers' Participation in Management (42nd Amendment)", desc:"The State shall take steps, by suitable legislation or in any other way, to secure the participation of workers in the management of undertakings, establishments, or other organisations engaged in any industry." },
    { num:"Article 44",  part:"Part IV — DPSP",                title:"Uniform Civil Code (Liberal/Intellectual)", desc:"The State shall endeavour to secure for the citizens a uniform civil code throughout the territory of India. This remains one of the most debated provisions of the Constitution, touching on personal laws of various religious communities." },
    { num:"Article 45",  part:"Part IV — DPSP",                title:"Early Childhood Care and Education (86th Amendment, 2002)", desc:"The State shall endeavour to provide early childhood care and education for all children until they complete the age of six years. (Earlier, this article directed free and compulsory education up to 14 years, which was moved to Article 21A as a Fundamental Right.)" },
    { num:"Article 46",  part:"Part IV — DPSP",                title:"Promotion of Education for SC, ST & Weaker Sections", desc:"The State shall promote with special care the educational and economic interests of the weaker sections of the people, and, in particular, of the Scheduled Castes and Scheduled Tribes, and shall protect them from social injustice and all forms of exploitation." },
    { num:"Article 47",  part:"Part IV — DPSP",                title:"Duty to Raise Nutrition and Public Health", desc:"The State shall regard the raising of the level of nutrition and the standard of living of its people and the improvement of public health as among its primary duties and, in particular, the State shall endeavour to bring about prohibition of the consumption of intoxicating drinks and drugs injurious to health." },
    { num:"Article 48",  part:"Part IV — DPSP",                title:"Organisation of Agriculture and Animal Husbandry", desc:"The State shall endeavour to organise agriculture and animal husbandry on modern and scientific lines and shall, in particular, take steps to preserve and improve the breeds and prohibit the slaughter of cows and calves and other milch and draught cattle." },
    { num:"Article 48A", part:"Part IV — DPSP",                title:"Protection of Environment (42nd Amendment, 1976)", desc:"The State shall endeavour to protect and improve the environment and to safeguard the forests and wildlife of the country. This is correlated with Article 51A(g) which makes it a Fundamental Duty of citizens." },
    { num:"Article 49",  part:"Part IV — DPSP",                title:"Protection of Monuments and National Importance", desc:"It shall be the obligation of the State to protect every monument or place or object of artistic or historic interest declared by or under law made by Parliament to be of national importance from spoliation, disfigurement, destruction, removal, disposal, or export." },
    { num:"Article 50",  part:"Part IV — DPSP",                title:"Separation of Judiciary from Executive", desc:"The State shall take steps to separate the judiciary from the executive in the public services of the State. This provision aims to ensure judicial independence at the subordinate level." },
    { num:"Article 51",  part:"Part IV — DPSP",                title:"Promotion of International Peace (Liberal)", desc:"The State shall endeavour to: (a) promote international peace and security; (b) maintain just and honourable relations between nations; (c) foster respect for international law and treaty obligations; (d) encourage settlement of international disputes by arbitration." },
    // PART IVA — Fundamental Duties
    { num:"Article 51A", part:"Part IVA — Fundamental Duties", title:"Fundamental Duties (11 Duties)", desc:"It shall be the duty of every citizen of India: (a) abide by the Constitution and respect national symbols; (b) cherish noble ideals of independence struggle; (c) uphold and protect sovereignty, unity, and integrity; (d) defend the country; (e) promote common brotherhood; (f) preserve rich heritage; (g) protect natural environment; (h) develop scientific temper and humanism; (i) safeguard public property; (j) strive for excellence; (k) provide education to children aged 6–14 (added by 86th Amendment, 2002). Incorporated by 42nd Amendment, 1976 on Swaran Singh Committee recommendation." },
    // PART V — The Union
    { num:"Article 52",  part:"Part V — The Union",            title:"The President of India", desc:"There shall be a President of India. The President is the constitutional head of the executive of the Union and the First Citizen of India." },
    { num:"Article 53",  part:"Part V — The Union",            title:"Executive Power of the Union", desc:"The executive power of the Union shall be vested in the President and shall be exercised by him either directly or through officers subordinate to him in accordance with this Constitution. The supreme command of the defence forces of the Union shall also be vested in the President." },
    { num:"Article 54",  part:"Part V — The Union",            title:"Election of President", desc:"The President shall be elected by the members of an electoral college consisting of: (a) elected members of both Houses of Parliament; (b) elected members of the Legislative Assemblies of the States; (c) elected members of the Legislative Assemblies of Delhi and Puducherry (added by 70th Amendment, 1992)." },
    { num:"Article 58",  part:"Part V — The Union",            title:"Qualifications for President", desc:"A person shall be eligible for election as President if he: (a) is a citizen of India; (b) has completed the age of 35 years; (c) is qualified for election as a member of the House of the People. A person shall not be eligible if they hold any office of profit under the Government." },
    { num:"Article 60",  part:"Part V — The Union",            title:"Oath of President", desc:"The President shall make and subscribe an oath or affirmation in the presence of the Chief Justice of India (or the senior-most Judge of the Supreme Court), to faithfully execute the office of the President and to the best of his ability to preserve, protect, and defend the Constitution and the law." },
    { num:"Article 61",  part:"Part V — The Union",            title:"Impeachment of President", desc:"The President may be removed from office for violation of the Constitution by a process of impeachment. The charge can be preferred by either House. The resolution must be passed by a special majority (2/3 of total membership). The other House investigates the charge. If passed by 2/3 majority, the President stands removed. No President has been impeached so far." },
    { num:"Article 63",  part:"Part V — The Union",            title:"The Vice-President of India", desc:"There shall be a Vice-President of India. The Vice-President is the ex-officio Chairman of the Rajya Sabha (Article 64) and acts as President during vacancies (Article 65)." },
    { num:"Article 72",  part:"Part V — The Union",            title:"Pardoning Powers of the President", desc:"The President shall have the power to grant pardons, reprieves, respites, or remissions of punishment, or to suspend, remit, or commute the sentence of any person convicted of any offence. This power extends to sentences by court martial and sentences of death — the Governor does not have this power for court martial or death sentences." },
    { num:"Article 74",  part:"Part V — The Union",            title:"Council of Ministers to Aid the President", desc:"There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President, who shall, in the exercise of his functions, act in accordance with such advice. The President may require the Council to reconsider such advice, and shall act in accordance with the advice tendered after such reconsideration (44th Amendment, 1978)." },
    { num:"Article 76",  part:"Part V — The Union",            title:"Attorney General of India", desc:"The President shall appoint a person who is qualified to be appointed a Judge of the Supreme Court to be the Attorney General for India. The AGI is the first law officer of the Government and has the right of audience in all courts in India." },
    { num:"Article 78",  part:"Part V — The Union",            title:"Duties of Prime Minister", desc:"It shall be the duty of the Prime Minister: (a) to communicate to the President all decisions of the Council of Ministers relating to administration and proposals for legislation; (b) to furnish such information as the President may call for; (c) if the President so requires, to submit for consideration of the Council of Ministers any matter on which a decision has been taken by a Minister but not considered by the Council." },
    { num:"Article 79",  part:"Part V — The Union",            title:"Constitution of Parliament", desc:"There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States (Rajya Sabha) and the House of the People (Lok Sabha)." },
    { num:"Article 80",  part:"Part V — The Union",            title:"Composition of the Rajya Sabha", desc:"The Council of States (Rajya Sabha) shall consist of: (a) 12 members nominated by the President (persons with special knowledge/practical experience in art, literature, science, and social service); (b) not more than 238 representatives of the States and Union Territories. Maximum strength: 250. Rajya Sabha is a permanent house and cannot be dissolved." },
    { num:"Article 81",  part:"Part V — The Union",            title:"Composition of the Lok Sabha", desc:"The Lok Sabha shall consist of: (a) not more than 530 representatives of States (chosen by direct election); (b) not more than 20 representatives of Union Territories; (c) not more than 2 members of the Anglo-Indian community (removed by 104th Amendment, 2020). Maximum strength: 552. Term: 5 years." },
    { num:"Article 100", part:"Part V — The Union",            title:"Voting in Houses and Quorum", desc:"All questions in either House or at a joint sitting shall be determined by a majority of votes of members present and voting. The quorum to constitute a meeting of either House is 1/10 of the total number of members of the House." },
    { num:"Article 105", part:"Part V — The Union",            title:"Parliamentary Privileges", desc:"Members of Parliament have freedom of speech in Parliament. No MP shall be liable to any proceedings in any court in respect of anything said or any vote given in Parliament or any committee thereof." },
    { num:"Article 108", part:"Part V — The Union",            title:"Joint Sitting of Both Houses", desc:"In the event of a deadlock between the two Houses on a Bill, or if more than 6 months elapse from the date of Bill being received by the other House without the Bill being passed, the President may summon a joint sitting presided over by the Speaker of Lok Sabha. A simple majority decides. A joint sitting has been held 3 times so far." },
    { num:"Article 109", part:"Part V — The Union",            title:"Special Procedure for Money Bills", desc:"A Money Bill shall not be introduced in the Rajya Sabha. After a Money Bill is passed by Lok Sabha and transmitted to Rajya Sabha, the Rajya Sabha must return it within 14 days. If it is not returned, it is deemed to have been passed. Rajya Sabha can only make recommendations which Lok Sabha is not bound to accept." },
    { num:"Article 110", part:"Part V — The Union",            title:"Definition of Money Bill", desc:"A Bill is deemed to be a Money Bill if it contains provisions dealing with: imposition/abolition/remission/alteration/regulation of any tax; regulation of borrowing; custody of the Consolidated Fund of India; appropriation of money out of the Consolidated Fund; any matter incidental to the above. The Speaker's decision that a Bill is a Money Bill is final." },
    { num:"Article 112", part:"Part V — The Union",            title:"Annual Financial Statement (Union Budget)", desc:"The President shall cause to be laid before both Houses of Parliament a statement of the estimated receipts and expenditure of the Government of India for that year — this is the Annual Budget or Union Budget. No demand for a grant shall be made except on the recommendation of the President." },
    { num:"Article 123", part:"Part V — The Union",            title:"President's Power to Promulgate Ordinances", desc:"When Parliament is not in session and the President is satisfied that circumstances exist which render it necessary to take immediate action, he may promulgate Ordinances. An Ordinance has the same force as an Act of Parliament. It must be approved by Parliament within 6 weeks of its reassembly, otherwise it ceases to operate. The President cannot promulgate an Ordinance if both Houses are not in session." },
    { num:"Article 124", part:"Part V — The Union",            title:"Establishment and Constitution of the Supreme Court", desc:"There shall be a Supreme Court of India consisting of a Chief Justice of India and not more than 33 other judges (increased by law). Judges are appointed by the President in consultation with such judges of the Supreme Court and High Courts as the President deems necessary. Collegium system is now in place (Three Judges Cases — 1981, 1993, 1998)." },
    { num:"Article 129", part:"Part V — The Union",            title:"Supreme Court as Court of Record", desc:"The Supreme Court shall be a court of record and shall have all the powers of such a court including the power to punish for contempt of itself." },
    { num:"Article 131", part:"Part V — The Union",            title:"Original Jurisdiction of the Supreme Court", desc:"The Supreme Court has exclusive original jurisdiction in any dispute between: (a) the Government of India and one or more States; (b) the Government of India and any State(s) on one side and one or more States on the other; (c) two or more States. This jurisdiction is not available to individuals." },
    { num:"Article 136", part:"Part V — The Union",            title:"Special Leave to Appeal (SLP)", desc:"The Supreme Court may, in its discretion, grant special leave to appeal from any judgment, decree, determination, sentence, or order in any cause or matter passed by any court or tribunal in India (except military tribunals). This is the widest appellate power of the Supreme Court." },
    { num:"Article 137", part:"Part V — The Union",            title:"Review of Judgements by the Supreme Court", desc:"The Supreme Court shall have power to review any judgment pronounced or order made by it. Review petitions must be filed within 30 days. If a review petition fails, a curative petition (Rupa Ashok Hurra case, 2002) can be filed." },
    { num:"Article 141", part:"Part V — The Union",            title:"Law Declared by Supreme Court is Binding", desc:"The law declared by the Supreme Court shall be binding on all courts within the territory of India. This makes the Supreme Court the final interpreter of the Constitution and all laws." },
    { num:"Article 142", part:"Part V — The Union",            title:"Enforcement of Supreme Court Decrees", desc:"The Supreme Court in the exercise of its jurisdiction may pass such decree or make such order as is necessary for doing complete justice in any cause or matter pending before it. This extraordinary power has been used in landmark cases like the Bhopal Gas tragedy settlement." },
    { num:"Article 143", part:"Part V — The Union",            title:"Advisory Jurisdiction of the Supreme Court", desc:"The President may refer a question of law or fact which is of public importance or which has arisen or likely to arise to the Supreme Court for its opinion. The Supreme Court must give its opinion but it is not binding on the President." },
    { num:"Article 148", part:"Part V — The Union",            title:"Comptroller and Auditor General of India (CAG)", desc:"There shall be a CAG of India appointed by the President. The CAG is the guardian of the public purse and audits all accounts of the Union and State governments. CAG serves for 6 years or until age 65, whichever is earlier, and cannot be reappointed. Reports of CAG are laid before Parliament/State Legislatures." },
    // PART VI — The States
    { num:"Article 153", part:"Part VI — The States",          title:"Governors of States", desc:"There shall be a Governor for each State. One person may be appointed as Governor for two or more States. The Governor is the constitutional head of the State and acts as an agent of the Centre." },
    { num:"Article 155", part:"Part VI — The States",          title:"Appointment of Governor", desc:"The Governor of a State shall be appointed by the President by warrant under his hand and seal. There is no election for the Governor. The Governor holds office during the pleasure of the President." },
    { num:"Article 161", part:"Part VI — The States",          title:"Pardoning Powers of the Governor", desc:"The Governor shall have the power to grant pardons, reprieves, respites, or remissions of punishment, or to suspend, remit, or commute the sentence of any person convicted of any offence. The Governor cannot pardon death sentences or sentences awarded by court martial." },
    { num:"Article 163", part:"Part VI — The States",          title:"Council of Ministers to Aid the Governor", desc:"There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor. The Governor shall act in accordance with such advice except in so far as he is required by or under this Constitution to exercise his functions in his discretion." },
    { num:"Article 167", part:"Part VI — The States",          title:"Duties of Chief Minister", desc:"It shall be the duty of the Chief Minister to communicate to the Governor all decisions of the Council of Ministers relating to the administration of the State and proposals for legislation; to furnish such information as the Governor may call for; and to submit for consideration of the Council of Ministers any matter on which a decision has been taken by a Minister but not yet considered by the Council." },
    { num:"Article 200", part:"Part VI — The States",          title:"Assent to Bills by Governor", desc:"When a Bill has been passed by the Legislature of a State, the Governor shall declare that: (a) he assents to the Bill; (b) he withholds assent; (c) he reserves the Bill for the consideration of the President. For money bills, the Governor must either assent or reserve — he cannot withhold assent." },
    { num:"Article 213", part:"Part VI — The States",          title:"Governor's Power to Promulgate Ordinances", desc:"When the State Legislature is not in session, if the Governor is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate Ordinances. However, a Governor cannot promulgate an Ordinance on certain matters without the instructions of the President." },
    { num:"Article 214", part:"Part VI — The States",          title:"High Courts for States", desc:"There shall be a High Court for each State. Parliament may by law establish a common High Court for two or more States. High Courts are courts of record." },
    { num:"Article 226", part:"Part VI — The States",          title:"Power of High Courts to Issue Writs", desc:"Every High Court shall have the power to issue to any person or authority directions, orders, or writs including habeas corpus, mandamus, prohibition, quo warranto, and certiorari. The High Court's writ jurisdiction (Article 226) is wider than that of the Supreme Court (Article 32) — HC can issue writs for enforcement of any legal right, not just Fundamental Rights." },
    { num:"Article 239AA",part:"Part VIII — Union Territories", title:"Special Provisions for Delhi (69th Amendment, 1991)", desc:"Delhi shall be called the National Capital Territory of Delhi (NCTD). There shall be a Lieutenant Governor and a Legislative Assembly for NCTD. The elected government of Delhi has powers over all matters except public order, police, and land. Significant constitutional debates have arisen over the relative powers of the LG and the elected government." },
    // PART IX — Panchayati Raj
    { num:"Article 243", part:"Part IX — Panchayati Raj",      title:"Definitions (73rd Amendment, 1992)", desc:"Provides definitions for key terms: District, Gram Sabha, Intermediate level, Panchayat, Panchayat area, Village, etc. for the purpose of Part IX relating to Panchayati Raj Institutions." },
    { num:"Article 243A",part:"Part IX — Panchayati Raj",      title:"Gram Sabha", desc:"A Gram Sabha may exercise such powers and perform such functions at the village level as the Legislature of a State may, by law, provide. The Gram Sabha is the foundation of the entire Panchayati Raj system." },
    { num:"Article 243B",part:"Part IX — Panchayati Raj",      title:"Constitution of Panchayats", desc:"There shall be constituted in every State, Panchayats at the village, intermediate, and district levels. A State having a population of less than 20 lakhs may not have an intermediate level." },
    { num:"Article 243D",part:"Part IX — Panchayati Raj",      title:"Reservation of Seats in Panchayats", desc:"Seats shall be reserved for SCs and STs in proportion to their population. Not less than 1/3 of seats shall be reserved for women (including seats reserved for SC/ST women). The office of Chairpersons at various levels shall also be reserved for SC, ST, and women." },
    { num:"Article 243G",part:"Part IX — Panchayati Raj",      title:"Powers and Responsibilities of Panchayats", desc:"The Legislature of a State may endow the Panchayats with such powers and authority and responsibilities as may be necessary to enable them to function as institutions of self-government. This includes preparation of plans and implementation of schemes for economic development and social justice — the 11th Schedule lists 29 subjects." },
    // PART XI — Union-State Relations
    { num:"Article 245", part:"Part XI — Union-State Relations",title:"Extent of Laws Made by Parliament and State Legislatures", desc:"Parliament may make laws for the whole or any part of the territory of India. State Legislatures may make laws for the whole or any part of the State. No law made by a State Legislature shall be deemed to be invalid on the ground that it would have extra-territorial operation." },
    { num:"Article 246", part:"Part XI — Union-State Relations",title:"Subject Matter of Laws — Three Lists", desc:"The Seventh Schedule contains three lists: (1) Union List (List I) — Parliament has exclusive power (100 subjects, including defence, foreign affairs, atomic energy, railways); (2) State List (List II) — State Legislatures have exclusive power (61 subjects, including police, public health, agriculture); (3) Concurrent List (List III) — Both can legislate (52 subjects, including education, marriage, forests). In case of conflict, the Union law prevails." },
    { num:"Article 249", part:"Part XI — Union-State Relations",title:"Parliament's Power on State List in National Interest", desc:"If the Rajya Sabha passes a resolution by 2/3 majority that it is necessary in the national interest that Parliament shall make laws with respect to a matter enumerated in the State List, Parliament may do so for a period not exceeding one year. This can be extended indefinitely by successive resolutions." },
    { num:"Article 262", part:"Part XI — Union-State Relations",title:"Adjudication of Inter-State Water Disputes", desc:"Parliament may by law provide for adjudication of any dispute or complaint with respect to use, distribution, or control of the waters of any inter-state river or river valley. Parliament may also provide that neither the Supreme Court nor any other court shall exercise jurisdiction in such disputes. The Inter-State Water Disputes Act, 1956, was enacted under this." },
    { num:"Article 263", part:"Part XI — Union-State Relations",title:"Inter-State Council", desc:"If at any time it appears to the President that the public interests would be served by the establishment of a Council charged with: (a) inquiring into and advising upon disputes between States; (b) investigating and discussing subjects of common interest; (c) making recommendations on such subjects. The Inter-State Council was set up in 1990." },
    // PART XII — Finance
    { num:"Article 265", part:"Part XII — Finance",             title:"No Tax Without Authority of Law", desc:"No tax shall be levied or collected except by authority of law. This principle ensures no arbitrary taxation — all taxes must have legislative sanction." },
    { num:"Article 266", part:"Part XII — Finance",             title:"Consolidated Fund and Public Account", desc:"All revenues received by the Government of India, all loans raised, and all moneys received in repayment of loans shall form one consolidated fund — the Consolidated Fund of India. All other public moneys go to the Public Account of India. Expenditure from the Consolidated Fund requires appropriation by Parliament." },
    { num:"Article 280", part:"Part XII — Finance",             title:"Finance Commission", desc:"The President shall, within two years of the Constitution's commencement, and thereafter at the expiration of every fifth year, constitute a Finance Commission to recommend: (a) distribution of net proceeds of taxes between Union and States; (b) principles governing grants-in-aid of State revenues; (c) any other matter referred by the President in the interest of sound finance." },
    { num:"Article 300A",part:"Part XII — Finance",             title:"Right to Property (44th Amendment, 1978)", desc:"No person shall be deprived of his property save by authority of law. The Right to Property was removed from Fundamental Rights (was Article 31) by the 44th Amendment, 1978, and made only a constitutional right (legal right) under Article 300A. It is now enforceable only in High Courts under Article 226, not in the Supreme Court under Article 32." },
    // PART XIV — Services
    { num:"Article 311", part:"Part XIV — Services",            title:"Protection of Civil Servants from Arbitrary Dismissal", desc:"No person who is a member of a civil service of the Union, or an all-India service, or a civil service of a State, shall be dismissed or removed by an authority subordinate to that by which he was appointed. The person must be given a reasonable opportunity of being heard in respect of charges." },
    { num:"Article 312", part:"Part XIV — Services",            title:"All India Services", desc:"If the Rajya Sabha passes a resolution by 2/3 majority declared to be necessary in the national interest, Parliament may by law create one or more All India Services. IAS (Indian Administrative Service), IPS (Indian Police Service), and IFS (Indian Forest Service) are All India Services common to the Union and the States." },
    { num:"Article 315", part:"Part XIV — Services",            title:"Union and State Public Service Commissions", desc:"There shall be a Public Service Commission for the Union (UPSC) and a Public Service Commission for each State (SPSC). Two or more States may agree that there shall be one Joint State Public Service Commission (JSPSC) for them." },
    { num:"Article 320", part:"Part XIV — Services",            title:"Functions of Public Service Commissions", desc:"It shall be the duty of the Union and State Public Service Commissions to conduct examinations for appointments to services of the Union and the States respectively. The UPSC must be consulted on matters relating to methods of recruitment, principles of appointments, promotions, transfers, and disciplinary matters." },
    // PART XV — Elections
    { num:"Article 324", part:"Part XV — Elections",            title:"Election Commission of India", desc:"The superintendence, direction, and control of the preparation of electoral rolls for and the conduct of elections to Parliament and State Legislatures, and elections to the offices of the President and Vice-President, shall be vested in the Election Commission. The ECI consists of the Chief Election Commissioner (CEC) and such other Election Commissioners as the President may from time to time fix." },
    { num:"Article 326", part:"Part XV — Elections",            title:"Adult Suffrage", desc:"The elections to the Lok Sabha and State Legislative Assemblies shall be on the basis of adult suffrage — every person who is a citizen of India and who is not less than 18 years of age (reduced from 21 by the 61st Amendment, 1988) on the qualifying date shall be entitled to be registered as a voter." },
    { num:"Article 329", part:"Part XV — Elections",            title:"Bar to Interference by Courts in Electoral Matters", desc:"Notwithstanding anything in this Constitution, the validity of any law relating to the delimitation of constituencies or allotment of seats to such constituencies shall not be called in question in any court. No election shall be called in question except by an election petition presented to such authority and in such manner as may be provided for by or under any law made by the appropriate legislature." },
    // PART XVI — Special Provisions
    { num:"Article 330", part:"Part XVI — Special Provisions",  title:"Reservation for SC/ST in Lok Sabha", desc:"Seats shall be reserved in the House of the People for Scheduled Castes and Scheduled Tribes. The number of reserved seats for SCs and STs bears the same proportion to the total number of seats as the population of SCs/STs in a State bears to the total population of that State. Originally for 10 years, now extended to 2030 by the 104th Amendment." },
    { num:"Article 338", part:"Part XVI — Special Provisions",  title:"National Commission for Scheduled Castes", desc:"There shall be a National Commission for Scheduled Castes (NCSC) to investigate and monitor all matters relating to the safeguards provided for SCs. The Commission examines reports of the specified authorities and recommends measures. It presents an annual report to the President." },
    { num:"Article 338A",part:"Part XVI — Special Provisions",  title:"National Commission for Scheduled Tribes", desc:"There shall be a National Commission for Scheduled Tribes (NCST) to investigate and monitor matters relating to safeguards for STs. Created by the 89th Constitutional Amendment Act, 2003, which bifurcated the earlier combined NCSC/NCST into separate commissions." },
    { num:"Article 338B",part:"Part XVI — Special Provisions",  title:"National Commission for Backward Classes", desc:"There shall be a National Commission for Backward Classes (NCBC) to examine the complaints and welfare measures regarding OBCs. Elevated to a constitutional body by the 102nd Constitutional Amendment Act, 2018." },
    { num:"Article 340", part:"Part XVI — Special Provisions",  title:"Appointment of Commission for Backward Classes", desc:"The President may appoint a Commission to investigate the conditions of socially and educationally backward classes and the difficulties under which they labour. The Kaka Kalelkar Commission (1953) and the Mandal Commission (1978–80) were constituted under this Article. The Mandal Commission report led to 27% reservation for OBCs." },
    // PART XVII — Official Language
    { num:"Article 343", part:"Part XVII — Official Language",  title:"Official Language of the Union", desc:"The official language of the Union shall be Hindi in Devanagari script. The form of numerals to be used shall be the international form of Indian numerals. English was to continue for 15 years (till 1965), but the Official Languages Act, 1963, continued the use of English indefinitely for official purposes of the Union." },
    { num:"Article 351", part:"Part XVII — Official Language",  title:"Directive for Development of Hindi", desc:"It shall be the duty of the Union to promote the spread of the Hindi language, to develop it so that it may serve as a medium of expression for all the elements of the composite culture of India and to secure its enrichment by assimilating forms, style, and expressions used in Hindustani and other languages listed in the Eighth Schedule." },
    // PART XVIII — Emergency Provisions
    { num:"Article 352", part:"Part XVIII — Emergency",         title:"National Emergency (Article 352)", desc:"The President may proclaim a National Emergency if the security of India or any part thereof is threatened by: (a) war; (b) external aggression; (c) armed rebellion (changed from 'internal disturbance' by 44th Amendment, 1978). The proclamation must be approved within 1 month by both Houses by special majority (2/3 of members present and voting + majority of total membership). Duration: 6 months, extendable. Invoked 3 times: 1962 (China War), 1971 (Pakistan War), 1975 (Internal Emergency — controversial)." },
    { num:"Article 356", part:"Part XVIII — Emergency",         title:"President's Rule / State Emergency", desc:"If the President, on receipt of a report from the Governor or otherwise, is satisfied that the government of the State cannot be carried on in accordance with the provisions of the Constitution, the President may assume the functions of the State Government — popularly known as President's Rule or Article 356 Emergency. Must be approved by Parliament within 2 months. Maximum duration: 3 years. The S.R. Bommai case (1994) significantly restricted its misuse." },
    { num:"Article 360", part:"Part XVIII — Emergency",         title:"Financial Emergency", desc:"If the President is satisfied that the financial stability or credit of India or of any part of the territory thereof is threatened, he may proclaim a Financial Emergency. Must be approved by Parliament within 2 months. During this, the President can direct States to observe canons of financial propriety, reduce salaries of government officials (including High Court judges), and reserve State Money Bills for Presidential consideration. Has never been proclaimed so far in India." },
    // PART XX — Amendment
    { num:"Article 368", part:"Part XX — Amendment",            title:"Power to Amend the Constitution", desc:"Parliament may, in exercise of its constituent power, amend by way of addition, variation, or repeal any provision of this Constitution in accordance with the procedure laid down. Three types of amendment procedure: (1) Simple majority — ordinary bills; (2) Special majority — 2/3 of members present and voting + majority of total membership; (3) Special majority + ratification by at least half of State Legislatures. The Basic Structure Doctrine (Kesavananda Bharati case, 1973) limits Parliament's amending power — the basic structure of the Constitution cannot be amended." },
    // PART XXI — Special Provisions
    { num:"Article 371A", part:"Part XXI — Special Provisions", title:"Special Provision for Nagaland", desc:"No Act of Parliament shall apply to Nagaland in respect of: (a) religious or social practices of the Nagas; (b) Naga customary law and procedure; (c) administration of civil and criminal justice involving Naga customary law; (d) ownership and transfer of land and its resources — unless the Legislative Assembly of Nagaland decides so." },
    { num:"Article 370",  part:"Part XXI — Special Provisions", title:"Special Status of J&K (Historical)", desc:"Article 370 granted special autonomous status to the State of Jammu & Kashmir. The Union's legislative power was limited to defence, foreign affairs, finance, and communications — other laws needed State concurrence. The Constituent Assembly of J&K was to decide which Union laws would apply. Abrogated on 5 August 2019 through Presidential Order under Article 370(3). J&K was bifurcated into two Union Territories: J&K (with legislature) and Ladakh (without legislature). Upheld by the Supreme Court in December 2023." },
    // KEY AMENDMENTS
    { num:"42nd Amendment (1976)", part:"Key Amendments",       title:"The 'Mini Constitution'", desc:"The most sweeping amendment to the Constitution, passed during the Emergency under Indira Gandhi. Key changes: (1) Added 'Socialist', 'Secular', and 'Integrity' to the Preamble; (2) Added Part IVA — Fundamental Duties (Article 51A); (3) Made DPSPs supersede Fundamental Rights (overturned by 44th Amendment); (4) Curtailed the power of judicial review; (5) Extended the term of Lok Sabha and State Assemblies from 5 to 6 years (reversed by 44th Amendment); (6) Added subjects to Concurrent List including education, forests, wildlife, administration of justice, and weights and measures." },
    { num:"44th Amendment (1978)", part:"Key Amendments",       title:"Restoration of Democratic Rights", desc:"Passed by the Janata Party government to undo the excesses of the 42nd Amendment. Key changes: (1) Restored the term of Lok Sabha and State Assemblies to 5 years; (2) Removed Right to Property from Fundamental Rights (Article 19 and 31) — now Article 300A; (3) Restored power of courts to review laws; (4) Made the President bound to give his decision within a reasonable time; (5) Made Article 20 and 21 non-suspendable even during National Emergency; (6) Provided that the President must return advice sent by the Cabinet for reconsideration once." },
    { num:"52nd Amendment (1985)", part:"Key Amendments",       title:"Anti-Defection Law (10th Schedule)", desc:"Added the Tenth Schedule to the Constitution — the Anti-Defection Law. A member of Parliament or State Legislature who voluntarily gives up membership of the political party on whose ticket he was elected, or votes against the direction of his party (whips), is disqualified from membership. The decision is taken by the Speaker/Chairman and the Supreme Court in Kihoto Hollohan case (1992) upheld the law but said the decision of the Speaker is subject to judicial review." },
    { num:"61st Amendment (1988)", part:"Key Amendments",       title:"Voting Age Reduced to 18", desc:"The 61st Amendment to the Constitution of India lowered the voting age for elections to the Lok Sabha and State Legislative Assemblies from 21 years to 18 years. This enfranchised millions of young voters and is one of the most significant expansions of democratic participation in India." },
    { num:"73rd Amendment (1992)", part:"Key Amendments",       title:"Panchayati Raj — Local Self Government", desc:"Gave constitutional status to Panchayati Raj Institutions by inserting Part IX (Articles 243–243O) and the 11th Schedule (29 subjects). Key provisions: (a) Three-tier structure: Gram Panchayat, Panchayat Samiti, Zila Parishad; (b) 5-year term; (c) Reservation for SC/ST and women (not less than 1/3); (d) Gram Sabha; (e) State Election Commission for holding Panchayat elections; (f) State Finance Commission for financial review every 5 years." },
    { num:"74th Amendment (1992)", part:"Key Amendments",       title:"Municipalities — Urban Local Bodies", desc:"Gave constitutional status to Urban Local Bodies (ULBs) by inserting Part IX-A (Articles 243P–243ZG) and the 12th Schedule (18 subjects). Three types of ULBs: (a) Nagar Panchayat (transitional area); (b) Municipal Council (smaller urban area); (c) Municipal Corporation (larger urban area). Provisions mirror the 73rd Amendment — reservations, elected wards committees, State Election Commission, and State Finance Commission." },
    { num:"86th Amendment (2002)", part:"Key Amendments",       title:"Right to Education", desc:"Made three changes: (1) Inserted Article 21A — made education a Fundamental Right for children between 6 and 14 years; (2) Amended Article 45 (DPSP) — now directs States to provide early childhood care for children under 6; (3) Added Article 51A(k) as a new Fundamental Duty — parents/guardians to provide opportunities for education to their child/ward between 6 and 14. The Right to Education Act, 2009, was enacted to give effect to this Amendment." },
    { num:"91st Amendment (2003)", part:"Key Amendments",       title:"Limit on Size of Council of Ministers", desc:"The total number of Ministers including the Prime Minister in the Central Council of Ministers shall not exceed 15% of the total strength of the Lok Sabha. Similarly, in State Councils of Ministers, the number shall not exceed 15% of the total strength of the State Legislative Assembly (minimum 12 Ministers). A member disqualified under the Anti-Defection Law shall also be disqualified from being appointed as a Minister." },
    { num:"97th Amendment (2011)", part:"Key Amendments",       title:"Co-operative Societies (Part IX-B)", desc:"Added Part IX-B (Articles 243ZH–243ZT) to give constitutional status to cooperative societies. Key provisions: members to elect board; term of board not more than 5 years; reservation for SC/ST and women; independent professional audit; conviction disqualifies membership; annual general body meetings mandatory." },
    { num:"100th Amendment (2015)", part:"Key Amendments",      title:"Land Boundary Agreement with Bangladesh", desc:"The 100th Amendment gave effect to the Land Boundary Agreement (LBA) of 1974 between India and Bangladesh. India transferred 111 enclaves to Bangladesh and received 51 enclaves from Bangladesh, resolving a long-standing border dispute. This required amendment to the First Schedule of the Constitution." },
    { num:"101st Amendment (2016)", part:"Key Amendments",      title:"Goods and Services Tax (GST)", desc:"Introduced GST by inserting Article 246A (both Parliament and State Legislatures can make laws on GST), Article 269A (IGST on inter-state trade), and Article 279A (GST Council — consists of Union Finance Minister, Union Minister of State for Finance, and Ministers from States). GST subsumed about 17 Central and State taxes. Implemented from 1 July 2017 with 4 tax slabs: 5%, 12%, 18%, and 28%." },
    { num:"102nd Amendment (2018)", part:"Key Amendments",      title:"National Commission for Backward Classes", desc:"Granted constitutional status to the National Commission for Backward Classes (NCBC) by inserting Article 338B. Also inserted Article 342A which empowers the President to specify socially and educationally backward classes, and the Parliament to make inclusions in or exclusions from the Central List of OBCs." },
    { num:"103rd Amendment (2019)", part:"Key Amendments",      title:"10% EWS Reservation", desc:"Provides for a maximum of 10% reservation in government jobs and educational admissions for Economically Weaker Sections (EWS) of citizens other than SCs, STs, and OBCs (i.e., general category). Amended Articles 15 and 16. Upheld by the Supreme Court in a 3-2 majority in the Janhit Abhiyan case (2022)." },
    { num:"104th Amendment (2020)", part:"Key Amendments",      title:"Removal of Anglo-Indian Reservation", desc:"Ended the reservation of seats for the Anglo-Indian community in the Lok Sabha and State Legislative Assemblies (Articles 331 and 333). Also ended the provision for nomination of Anglo-Indian members to these bodies. Originally provided for 10 years (1950–1960), extended multiple times; finally ended after 70 years." },
    { num:"105th Amendment (2021)", part:"Key Amendments",      title:"Restoration of State Power to List OBCs", desc:"Restored the power of State governments to identify OBCs for the purpose of reservation in State government jobs and educational institutions. This was done in response to the Supreme Court's judgment in the Maratha reservation case which had stripped State governments of this power." },
    { num:"106th Amendment (2023)", part:"Key Amendments",      title:"Women's Reservation (One-Third Seats)", desc:"The Constitution (One Hundred and Sixth Amendment) Act, 2023, also called the 'Nari Shakti Vandan Adhiniyam', provides reservation of one-third of seats for women in the Lok Sabha, State Legislative Assemblies, and the Legislative Assembly of Delhi (NCT). This reservation is to come into effect after the first census conducted after the enactment and subsequent delimitation exercise." },
    // KEY SCHEDULES
    { num:"7th Schedule",  part:"Schedules",                    title:"Three Legislative Lists", desc:"Contains the Union List (List I — 100 subjects, Parliament's exclusive domain including defence, foreign affairs, atomic energy, railways, banking), State List (List II — 61 subjects, State's exclusive domain including police, public health, agriculture, land), and Concurrent List (List III — 52 subjects where both can legislate including education, marriage and divorce, forests, trade unions). In case of conflict between Union and State laws on Concurrent List, Union law prevails (Article 254)." },
    { num:"8th Schedule",  part:"Schedules",                    title:"22 Recognised Languages", desc:"Originally contained 14 languages. Sindhi was added by the 21st Amendment (1967). Konkani, Manipuri, and Nepali were added by the 71st Amendment (1992). Bodo, Dogri, Maithili, and Santhali were added by the 92nd Amendment (2003). Total: 22 languages. States have a right to adopt any of these languages as their official language (Article 345). The 8th Schedule is relevant for the constitution of the Official Language Commission." },
    { num:"9th Schedule",  part:"Schedules",                    title:"Protection from Judicial Review", desc:"Added by the 1st Constitutional Amendment (1951) to protect land reform laws from judicial challenge on the grounds of violation of Fundamental Rights. Currently contains 284 laws. The Supreme Court in I.R. Coelho case (2007) held that laws placed in the 9th Schedule after April 24, 1973 (date of Kesavananda Bharati judgment) can be challenged if they violate the Basic Structure of the Constitution." },
    { num:"10th Schedule", part:"Schedules",                    title:"Anti-Defection Law (52nd Amendment, 1985)", desc:"Provides for disqualification of members of Parliament and State Legislatures on ground of defection. A member is disqualified if: (a) he voluntarily gives up membership of his political party; (b) he votes or abstains from voting in a House contrary to any direction issued by his political party (whip). Exception: merger of parties — when not less than 2/3 of members of a legislative party merge with another party. The Speaker/Chairman decides, subject to judicial review (Kihoto Hollohan case, 1992)." },
    { num:"11th Schedule", part:"Schedules",                    title:"29 Functions of Panchayats (73rd Amendment)", desc:"Added by the 73rd Amendment (1992), lists 29 subjects that may be devolved to Panchayats by State governments including: Agriculture, Land improvement, Minor irrigation, Animal husbandry, Fisheries, Social forestry, Small scale industries, Rural housing, Drinking water, Roads, Bridges, Rural electrification, Non-conventional energy, Poverty alleviation, Education, Cultural activities, Markets and fairs, Health and sanitation, Women and child development, Social welfare, Welfare of weaker sections, Public distribution, Maintenance of community assets." },
    { num:"12th Schedule", part:"Schedules",                    title:"18 Functions of Municipalities (74th Amendment)", desc:"Added by the 74th Amendment (1992), lists 18 subjects for Urban Local Bodies including: Urban planning including town planning, Regulation of land-use, Planning for economic and social development, Roads and bridges, Water supply, Public health, sanitation, Slum improvement, Urban poverty alleviation, Provision of urban amenities, Promotion of cultural, educational, and aesthetic aspects, Burials and burial grounds, Cattle pounds, Vital statistics, Public amenities, Regulation of slaughterhouses." },
  ];

  const randomArticle = ARTICLES[Math.floor(Math.random() * ARTICLES.length)];

  let seeded = false, polityClean = false, mihClean = false, emptyClean = false, extraSubjects = false;
  let backups = {};          // safety copies of anything the one-time clean-ups removed (saved to Firebase too)
  let persist = function () {};  // set by init(); writes the payload to Firebase users/{uid}.revision
  function keepBackup(key, payload) {
    backups[key] = payload;
    try { localStorage.setItem('upscPrelims_' + key, JSON.stringify(payload)); } catch (e) {}
  }
  let subjects = [...DEFAULT_SUBJECTS];
  let data = {};
  let current = subjects[0];
  let expanded = {};
  let filter = null; // null | 'overdue' | 'soon' | 'fresh' | 'never'

  function initData() { subjects.forEach(s => { if (!data[s]) data[s] = []; }); }

  function isUntouchedList(a) {
    return a.every(c => !c.lastRevised && !c.note && (c.status||'Not Started') === 'Not Started' && !c.revisionCount);
  }
  function freshSeed() {
    subjects = [...SEED.subjects, ...DEFAULT_SUBJECTS.filter(d => !SEED.subjects.includes(d))];
    data = JSON.parse(JSON.stringify(SEED.data));
  }
  function init(saved, persistFn) {
    if (typeof persistFn === 'function') persist = persistFn;
    seeded = false; polityClean = false; mihClean = false; emptyClean = false; extraSubjects = false;
    backups = (saved && saved.backups && typeof saved.backups === 'object') ? saved.backups : {};
    if (saved && saved.seeded === 'v4') { polityClean = !!saved.polityClean; mihClean = !!saved.mihClean; emptyClean = !!saved.emptyClean; extraSubjects = !!saved.extraSubjects; }
    if (!saved || !saved.subjects) {
      freshSeed(); save();
    } else {
      const oldSubjects = saved.subjects, oldData = saved.data || {};
      if (saved.seeded === 'v4') {
        subjects = oldSubjects; data = oldData;
      } else {
        // one-time migration to the Prelims foundation set. Progress inside these subjects is kept;
        // other subjects are removed from the tracker, with a safety copy left in localStorage.
        const removed = {};
        oldSubjects.forEach(s => { if (!SEED.subjects.includes(s) && (oldData[s]||[]).length) removed[s] = oldData[s]; });
        if (Object.keys(removed).length) keepBackup('removedSubjects', { date: new Date().toISOString(), data: removed });
        subjects = [...SEED.subjects, ...DEFAULT_SUBJECTS.filter(d => !SEED.subjects.includes(d))];
        data = {};
        SEED.subjects.forEach(sub => {
          const cur = oldData[sub] || [];
          const isOldPreset = cur.length && cur.every(c => String(c.id).startsWith('preset-')) && isUntouchedList(cur);
          if (isOldPreset) { data[sub] = JSON.parse(JSON.stringify(SEED.data[sub])); return; }
          const have = new Set(cur.map(c => c.id));
          const merged = SEED.data[sub].map(c => cur.find(x => x.id === c.id) || JSON.parse(JSON.stringify(c)));
          cur.forEach(c => { if (!SEED.data[sub].some(x => x.id === c.id)) merged.push(c); }); // your own added topics
          data[sub] = merged;
        });
        save();
      }
    }
    // status rename: Revised -> Revise 1, Mastered -> Seal
    { let ch0 = false; Object.values(data).forEach(a => a.forEach(c => { if (c.status === 'Revised') { c.status = 'Revise 1'; ch0 = true; } else if (c.status === 'Mastered') { c.status = 'Seal'; ch0 = true; } })); if (ch0) save(); }
    if (!saved || !saved.mihClean) {
      const list = data['Modern Indian History'] || [];
      const rm = list.filter(c => /^\s*CH\s*\d+/i.test(c.name) || String(c.id).startsWith('preset-'));
      if (rm.length) {
        keepBackup('mihChapters', { date: new Date().toISOString(), chapters: rm });
        data['Modern Indian History'] = list.filter(c => !rm.includes(c));
      }
      mihClean = true; save();
    }
    if (!saved || !saved.polityClean) {
      const list = data['Polity'] || [];
      const rm = list.filter(c => /^\s*CH\s*\d+/i.test(c.name) || String(c.id).startsWith('preset-'));
      if (rm.length) {
        keepBackup('polityChapters', { date: new Date().toISOString(), chapters: rm });
        data['Polity'] = list.filter(c => !rm.includes(c));
      }
      polityClean = true; save();
    }
    if (saved && !saved.emptyClean) {
      // one-time: drop subjects that have no chapters
      subjects = subjects.filter(s => (data[s] || []).length);
      Object.keys(data).forEach(s => { if (!subjects.includes(s)) delete data[s]; });
      emptyClean = true; save();
    }
    if (!saved || !saved.extraSubjects) {
      // one-time: add the empty subjects you will fill in manually
      EXTRA_SUBJECTS.forEach(x => { if (!subjects.includes(x)) subjects.push(x); });
      extraSubjects = true; emptyClean = true; save();
    }
    initData();
    if (current !== 'All' && !subjects.includes(current)) current = subjects[0];
    render();
  }

  function save() {
    const payload = { subjects, data, seeded: 'v4', polityClean, mihClean, emptyClean, extraSubjects };
    try { if (JSON.stringify(backups).length < 150000) payload.backups = backups; } catch (e) {}
    persist(payload);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ subjects, data }, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'upsc-revision-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData() { document.getElementById('rev-import-input').click(); }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      try {
        const imported = JSON.parse(ev.target.result);
        if (confirm('Replace current data with this backup?')) {
          subjects = imported.subjects || [...DEFAULT_SUBJECTS];
          data = imported.data || {};
          initData();
          current = subjects[0];
          save(); render();
          alert('Import successful!');
        }
      } catch (err) { alert('Invalid backup file.'); }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  function openAddSubject() {
    document.getElementById('rev-modal-layer').innerHTML = `
      <div class="modal-bg" onclick="revCloseModal(event)">
        <div class="modal" onclick="event.stopPropagation()">
          <h3>Add subject</h3>
          <input id="rev-m-subj" placeholder="e.g. Science & Technology" onkeydown="if(event.key==='Enter')revConfirmAddSubject()">
          <div class="modal-btns">
            <button class="hbtn" onclick="revCloseModal()">Cancel</button>
            <button class="hbtn primary" onclick="revConfirmAddSubject()">Add</button>
          </div>
        </div>
      </div>`;
    setTimeout(() => document.getElementById('rev-m-subj')?.focus(), 50);
  }

  function closeModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('rev-modal-layer').innerHTML = '';
  }

  function confirmAddSubject() {
    const name = document.getElementById('rev-m-subj')?.value.trim();
    if (!name) return;
    if (subjects.includes(name)) { alert('Subject already exists.'); return; }
    subjects.push(name);
    data[name] = [];
    current = name;
    save(); closeModal(); render();
  }

  function deleteSubject(s) {
    const count = (data[s]||[]).length;
    const msg = count > 0 ? `"${s}" has ${count} chapter(s). Delete subject and all chapters?` : `Delete subject "${s}"?`;
    if (!confirm(msg)) return;
    subjects = subjects.filter(x => x !== s);
    delete data[s];
    if (current === s) current = subjects[0] || '';
    save(); render();
  }

  function daysSince(d) {
    if (!d) return null;
    const diff = new Date().setHours(0,0,0,0) - new Date(d).setHours(0,0,0,0);
    return Math.floor(diff / 86400000);
  }

  function badgeInfo(ch) {
    const d = daysSince(ch.lastRevised);
    if (d === null) return { cls:'never', text:'Never revised' };
    if (d >= 15) return { cls:'overdue', text: d + 'd ago — revise now' };
    if (d >= 8) return { cls:'soon', text: d + 'd ago — due soon' };
    if (d === 0) return { cls:'fresh', text:'Revised today' };
    return { cls:'fresh', text: d + 'd ago' };
  }

  function priorityOf(ch) {
    const d = daysSince(ch.lastRevised);
    if (d === null) return 0;
    if (d >= 15) return 1;
    if (d >= 8) return 2;
    return 3;
  }

  function sortedChapters() {
    const sort = document.getElementById('rev-sort-sel').value;
    let chs;
    if (current === 'All') {
      chs = [];
      subjects.forEach(s => (data[s]||[]).forEach((ch,i) => chs.push({...ch, _i:i, _subject:s})));
    } else {
      chs = (data[current]||[]).map((ch,i) => ({...ch, _i:i, _subject:current}));
    }
    if (sort === 'priority') return chs.sort((a,b) => priorityOf(a) - priorityOf(b));
    if (sort === 'name') return chs.sort((a,b) => a.name.localeCompare(b.name));
    return chs;
  }

  function esc(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') }

  function render() {
    renderDailyThought();
    renderDashboard();
    const allCount = subjects.reduce((sum,s) => sum + (data[s]||[]).length, 0);
    document.getElementById('rev-tabs').innerHTML =
      `<button class="tab all-tab${current==='All'?' active':''}" onclick="revSwitchTab('All')">
        ⭐ All <span style="opacity:.6;font-size:11px">${allCount}</span>
      </button>` +
      subjects.map(s => {
      const count = (data[s]||[]).length;
      return `<button class="tab${s===current?' active':''}" onclick="revSwitchTab('${esc(s)}')">
        ${esc(s)} <span style="opacity:.6;font-size:11px">${count}</span>
        <span class="tab-del" onclick="event.stopPropagation();revDeleteSubject('${esc(s)}')" title="Remove subject">✕</span>
      </button>`;
    }).join('');

    let ov=0,so=0,fr=0,nv=0;
    subjects.forEach(s => (data[s]||[]).forEach(ch => {
      const d = daysSince(ch.lastRevised);
      if (d===null) nv++; else if (d>=15) ov++; else if (d>=8) so++; else fr++;
    }));
    // the old 4-tile counters no longer exist (the dashboard draws its own tiles), so update them only if present
    Object.entries({overdue:ov, soon:so, fresh:fr, never:nv}).forEach(([k,v]) => { const el = document.getElementById('rev-s-'+k); if (el) el.textContent = v; });
    ['overdue','soon','fresh','never'].forEach(f => {
      document.getElementById('rev-stat-'+f)?.classList.toggle('active-filter', filter === f);
    });

    const toolbar = document.getElementById('rev-toolbar');
    if (toolbar) toolbar.style.display = (current === 'All') ? 'none' : 'flex';

    const list = document.getElementById('rev-chapter-list');
    if (!current) { list.innerHTML = '<div class="empty">No subjects yet.</div>'; return; }

    let chs = sortedChapters();
    if (filter) {
      chs = chs.filter(ch => {
        const d = daysSince(ch.lastRevised);
        if (filter === 'never')   return d === null;
        if (filter === 'overdue') return d !== null && d >= 15;
        if (filter === 'soon')    return d !== null && d >= 8 && d < 15;
        if (filter === 'fresh')   return d !== null && d < 8;
      });
    }
    const FILTER_LABELS = {
      overdue: '🔴 Overdue Chapters (15d+)',
      soon:    '🟡 Due Soon (8–14 days)',
      fresh:   '🟢 Recently Revised (0–7 days)',
      never:   '⚪ Never Revised'
    };
    const scopeLabel = current === 'All' ? 'all subjects' : ('in ' + esc(current));
    const headingHtml = filter
      ? `<div class="filter-heading">${FILTER_LABELS[filter]} <span style="opacity:.5">— ${chs.length} chapter${chs.length!==1?'s':''} ${scopeLabel}</span>
           <button class="filter-clear" onclick="revClearFilter()">✕ Clear filter</button>
         </div>`
      : '';

    if (!chs.length) {
      list.innerHTML = headingHtml + (filter
        ? '<div class="empty"><div class="empty-icon">✅</div>No chapters in this category.</div>'
        : (current === 'All'
            ? `<div class="empty"><div class="empty-icon">📖</div>No chapters yet in any subject.</div>`
            : `<div class="empty"><div class="empty-icon">📖</div>No chapters in ${esc(current)} yet.<br>Type a chapter name above and press Enter.</div>`));
      return;
    }

    list.innerHTML = headingHtml + chs.map(ch => {
      const b = badgeInfo(ch);
      const isOpen = expanded[ch.id];
      const revLabel = ch.revisionCount > 0 ? `${ch.revisionCount}× revised` : '';
      return `<div class="ch-card ${b.cls}">
        <div class="ch-head" onclick="revToggleExpand('${ch.id}')">
          <span class="ch-name">${esc(ch.name)}</span>
          ${current === 'All' ? `<span class="subject-tag">${esc(ch._subject)}</span>` : ''}
          ${ch.status && ch.status !== 'Not Started' ? `<span class="tg-chip ${tagClass(ch.status)}">${ch.status==='Seal'?'🏅 ':''}${esc(ch.status)}</span>` : ''}
          ${revLabel ? `<span class="rev-count">${revLabel}</span>` : ''}
          <span class="badge ${b.cls}">${b.text}</span>
          <div class="ch-actions" onclick="event.stopPropagation()">
            <button class="icon-btn" onclick="revDeleteChapter('${ch.id}')" title="Delete chapter">✕</button>
            <span class="chevron ${isOpen?'open':''}">▼</span>
          </div>
        </div>
        ${isOpen ? `<div class="ch-body">
          <div class="field-row">
            <label>Chapter name</label>
            <input type="text" class="name-in" value="${esc(ch.name)}" onchange="revSetField('${ch.id}','name',this.value)">
          </div>
          <div class="field-row">
            <label>Last revised</label>
            <input type="date" value="${ch.lastRevised||''}" onchange="revSetField('${ch.id}','lastRevised',this.value)">
            <button class="hbtn primary" style="font-size:11px;padding:4px 10px" onclick="revMarkToday('${ch.id}')">Mark today</button>
          </div>
          <div class="field-row">
            <label>Status tag</label>
            <div class="tagpick">${STATUSES.map(t => `<button class="tg ${tagClass(t)}${ch.status===t?' on':''}" onclick="revSetField('${ch.id}','status','${t}')">${t==='Seal'?'🏅 ':''}${t}</button>`).join('')}</div>
          </div>
          <div class="field-row note-row">
            <label>Notes</label>
            <textarea placeholder="Key concepts, exam tips, important dates…" onchange="revSetField('${ch.id}','note',this.value)">${esc(ch.note||'')}</textarea>
          </div>
        </div>` : ''}
      </div>`;
    }).join('');
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const STATUSES = ['Not Started','In Progress','Lectures Done','Revise 1','Revise 2','Revise 3','Revise 4','Revise 5','Seal'];
  function tagClass(t){ return t==='Seal' ? 'seal' : /^Revise/.test(t) ? 'rv rv'+t.slice(-1) : t==='Lectures Done' ? 'ld' : t==='In Progress' ? 'ip' : 'ns'; }
  const STATUS_META = [
    { key:'Not Started',   color:'#B8B6AE', w:0 },
    { key:'In Progress',   color:'#F0A93B', w:0.25 },
    { key:'Lectures Done', color:'#4C8DFF', w:0.5 },
    { key:'Revised',       color:'#7B74EA', w:0.75 },
    { key:'Mastered',      color:'#5FA02A', w:1 }
  ];
  let dashOpen = true;
  function toggleDash(){ dashOpen = !dashOpen; renderDashboard(); }
  function isoDay(offset) {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() + offset);
    const m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0');
    return d.getFullYear() + '-' + m + '-' + day;
  }
  function revisionDates(ch) {
    const set = new Set(ch.history || []);
    if (ch.lastRevised) set.add(ch.lastRevised);
    return set;
  }
  // ── Dashboard (greeting + subject boxes) ──
  const SUBJ_COLORS = ['#4A43A8','#1F9AB3','#2E9B4A','#E08A12','#D6409F','#7C5CFF','#E04848','#0F766E'];
  function openSubject(sub){ current = sub; render(); const t = document.getElementById('rev-tabs'); if (t) window.scrollTo({ top: t.offsetTop - 20, behavior:'smooth' }); }
  function renderDashboard() {
    const el = document.getElementById('rev-dashboard');
    if (!el) return;
    const all = [];
    subjects.forEach(s => (data[s]||[]).forEach(ch => all.push(ch)));
    const total = all.length, started = all.filter(c => c.lastRevised).length;
    const pct = total ? Math.round(started / total * 100) : 0;
    const wk = {}; for (let i = 0; i < 7; i++) wk[isoDay(-i)] = 1;
    const weekTopics = all.filter(c => [...revisionDates(c)].some(d => wk[d])).length;
    const h = new Date().getHours();
    const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    const dateStr = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
    const C = 2 * Math.PI * 70;
    const tile = (k, color, lbl) => `<div class="tile${filter===k?' active-filter':''}" id="rev-stat-${k}" onclick="revSetFilter('${k}')"><span class="td" style="background:${color}"></span><b id="rev-s-${k}">0</b><span class="tl">${lbl}</span></div>`;
    const left = `<div class="dcard">
      <h2>${greet} <span class="wave">👋</span></h2>
      <p class="dsub">${dateStr} · here is where your Prelims preparation stands</p>
      <div class="d-ringrow">
        <div class="d-ring"><svg viewBox="0 0 160 160" width="150" height="150"><circle cx="80" cy="80" r="70" fill="none" stroke="var(--track)" stroke-width="16"/><circle cx="80" cy="80" r="70" fill="none" stroke="var(--accent)" stroke-width="16" stroke-linecap="round" transform="rotate(-90 80 80)" stroke-dasharray="${(C*pct/100).toFixed(1)} ${C.toFixed(1)}"/></svg>
          <div class="d-ringc"><b>${pct}%</b><span>started</span></div></div>
        <div class="d-text">You have started <b>${started}</b> of <b>${total}</b> topics.<br><b>${total-started}</b> still to begin.</div>
      </div>
      <div class="tiles">${tile('overdue','#D64545','Overdue<br>15+ days')}${tile('soon','#E3A21A','Due soon<br>8–14 days')}${tile('fresh','#3FA34D','Recently revised<br>0–7 days')}${tile('never','#9A9CB5','Not started<br>yet')}</div>
      <div class="d-foot">📅 ${weekTopics} topic${weekTopics===1?'':'s'} revised in the last 7 days</div>
    </div>`;
    const boxes = subjects.map((s, i) => {
      const chs = data[s] || [], n = chs.length, st = chs.filter(c => c.lastRevised).length;
      const p = n ? Math.round(st / n * 100) : 0, c = SUBJ_COLORS[i % SUBJ_COLORS.length];
      const cnt = { f:0, s:0, o:0, n:0 };
      const dots = chs.map(ch => { const d = daysSince(ch.lastRevised); const k = d === null ? 'n' : d >= 15 ? 'o' : d >= 8 ? 's' : 'f'; cnt[k]++; return `<i class="dt ${k}" title="${esc(ch.name)}"></i>`; }).join('');
      const rc = cnt.o ? '#D64545' : cnt.s ? '#E3A21A' : cnt.f ? '#3FA34D' : 'var(--muted)';
      const R = 19, C = 2 * Math.PI * R;
      return `<div class="sbox${s===current?' sel':''}" style="--c:${c};--rc:${rc}" onclick="revOpenSubject('${esc(s)}')">
        <div class="sb-head">
          <div class="sb-ring"><svg viewBox="0 0 48 48" width="52" height="52"><circle cx="24" cy="24" r="${R}" fill="none" stroke="var(--track)" stroke-width="5"/><circle cx="24" cy="24" r="${R}" fill="none" stroke="var(--rc)" stroke-width="5" stroke-linecap="round" transform="rotate(-90 24 24)" stroke-dasharray="${(C*p/100).toFixed(1)} ${C.toFixed(1)}"/></svg><b>${p}%</b></div>
          <div class="sb-meta"><span class="sb-name">${esc(s)}</span><span class="sb-count">${st} of ${n} topics started</span></div>
        </div>
        <div class="dots">${dots || '<span class="sb-none">No topics yet</span>'}</div>
        <div class="sb-stats"><span class="o">${cnt.o} overdue</span><span class="s">${cnt.s} soon</span><span class="f">${cnt.f} fresh</span><span class="n">${cnt.n} new</span></div>
      </div>`;
    }).join('');
    const right = `<div class="dcard"><h2>📘 Your subjects</h2><p class="dsub">Tap a subject to open its topics.</p><div class="sgrid">${boxes}</div></div>`;
    el.innerHTML = left + right;
  }

  function switchTab(s){ current=s; render() }
  function toggleExpand(id){ expanded[id]=!expanded[id]; render() }

  function setFilter(f) {
    filter = (filter === f) ? null : f; // clicking same filter again clears it
    render();
  }
  function clearFilter() { filter = null; render(); }

  function renderDailyThought() {
    const el = document.getElementById('rev-daily-thought');
    if (!el) return;
    el.innerHTML = `
      <div class="thought-label">📜 ${randomArticle.part || ''}</div>
      <div class="thought-text" style="font-style:normal;font-weight:600;font-size:14px;margin-bottom:4px">${randomArticle.num} — ${randomArticle.title}</div>
      <div class="thought-text" style="font-style:normal">${randomArticle.desc}</div>`;
  }

  function addChapter() {
    const inp = document.getElementById('rev-ch-input');
    const name = inp.value.trim();
    if (!name || !current) return;
    if (!data[current]) data[current]=[];
    data[current].push({ id: Date.now().toString(), name, lastRevised:'', status:'Not Started', note:'', revisionCount:0 });
    inp.value='';
    save(); render();
    inp.focus();
  }

  function setField(id, field, val) {
    for (const s of subjects) {
      const ch = (data[s]||[]).find(c => c.id===id);
      if (ch) {
        if (field==='name' && !String(val).trim()) { render(); return; }
        if (field==='lastRevised' && val && val!==ch.lastRevised) {
          ch.revisionCount=(ch.revisionCount||0)+1;
          if (!ch.history) ch.history=[];
          if (!ch.history.includes(val)) ch.history.push(val);
        }
        ch[field]=val;
        save(); render(); return;
      }
    }
  }

  function markToday(id){ setField(id,'lastRevised',new Date().toISOString().slice(0,10)) }

  function deleteChapter(id) {
    for (const s of subjects) {
      const idx=(data[s]||[]).findIndex(c=>c.id===id);
      if (idx!==-1) {
        if (!confirm(`Delete "${data[s][idx].name}"?`)) return;
        data[s].splice(idx,1);
        delete expanded[id];
        save(); render(); return;
      }
    }
  }

  return { init, render, switchTab, toggleExpand, addChapter, setField, markToday, deleteChapter,
           openAddSubject, closeModal, confirmAddSubject, deleteSubject, importData, exportData, handleImport,
           setFilter, clearFilter, randomArticle, openSubject,
           items(){ const o=[]; subjects.forEach(s=>(data[s]||[]).forEach(c=>{ const d=daysSince(c.lastRevised); if(d!==null&&d>=8) o.push({id:c.id,name:c.name,subject:s,days:d}); })); return o; },
           summary(){ const all=[]; subjects.forEach(s=>(data[s]||[]).forEach(c=>all.push(c))); const total=all.length, started=all.filter(c=>c.lastRevised).length; const dc=c=>{const d=daysSince(c.lastRevised);return d===null?'n':d>=15?'o':d>=8?'s':'f'}; let overdue=0,soon=0,fresh=0; all.forEach(c=>{const k=dc(c); if(k==='o')overdue++; else if(k==='s')soon++; else if(k==='f')fresh++;}); return {started,total,pct:total?Math.round(started/total*100):0,overdue,soon,fresh}; } };
})();

window.revRender = RevisionTool.render;
window.revSwitchTab = RevisionTool.switchTab;
window.revToggleExpand = RevisionTool.toggleExpand;
window.revAddChapter = RevisionTool.addChapter;
window.revSetField = RevisionTool.setField;
window.revMarkToday = RevisionTool.markToday;
window.revDeleteChapter = RevisionTool.deleteChapter;
window.revOpenAddSubject = RevisionTool.openAddSubject;
window.revCloseModal = RevisionTool.closeModal;
window.revConfirmAddSubject = RevisionTool.confirmAddSubject;
window.revDeleteSubject = RevisionTool.deleteSubject;
window.revImportData = RevisionTool.importData;
window.revExportData = RevisionTool.exportData;
window.revHandleImport = RevisionTool.handleImport;
window.revSetFilter = RevisionTool.setFilter;
window.revOpenSubject = RevisionTool.openSubject;
window.revClearFilter = RevisionTool.clearFilter;
